import type { Coin } from "@/features/market/api/schemas";
import React, { useMemo, useRef } from "react";
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable, type ColumnDef, type SortingState } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react'
import { useVirtualizer } from "@tanstack/react-virtual";

interface VirtualDataGridProps {
    data: Coin[];
    isLoading?: boolean;
}
export const VirtualDataGrid: React.FC<VirtualDataGridProps> = ({ data, isLoading }) => {
  const [ sorting, setSorting ] = React.useState<SortingState>([])  

  const tableContainerRef = useRef<HTMLDivElement>(null);
    
  const columns = useMemo<ColumnDef<Coin>[]>(
    () => [
        {
            accessorKey: 'name',
            header: 'Coin Name',
            cell: (info) => (
                <div className="flex items-center gap-2 font-medium">
                    <img src={info.row.original.image} alt="" className="w-6 h-6 rounded-full" aria-hidden="true" />
                    {info.getValue() as string}
                   <span className="text-xs text-muted-foreground uppercase">{info.row.original.symbol} </span> 
                </div>
            )
        },
        {
            accessorKey: 'current_price',
            header: ({ column }) => {
                return (
                    <button className="flex items-center gap-1 hover:text-primary transition-colors font-semibold" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} aria-label={
                        column.getIsSorted() === 'desc' ?
                        "Sorted descending. Click to sort ascending." :
                        "Sort by Price"
                    }>
                        Price (USD)
                        <ArrowUpDown className="h-3 w-3" />
                    </button>
                )
            },
            cell: (info) => {
                const val = info.getValue() as number;

                return  new Intl.NumberFormat('en-US', {
                   style: 'currency',
                   currency: 'USD', 
                }).format(val);
            },
        },
        {
            accessorKey: 'price_change_percentage_24h',
            header: '24h Change',
            cell: (info) => {
                const val = info.getValue() as number;

                return (
                    <span className={val > 0 ? 'text-green-600' : 'text-red-600'}>
                        {val?.toFixed(2)}%
                    </span>
                )
            }
        }
    ],
    []
  )
    
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  })
    
  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 60,
    overscan: 10, 
  })
    
  const virtualItems = rowVirtualizer.getVirtualItems();

  const totalSize = rowVirtualizer.getTotalSize();
  const paddingTop = virtualItems.length > 0 ? virtualItems[0].start : 0;
  const paddingBottom = virtualItems.length > 0 ? totalSize - (virtualItems[virtualItems.length - 1].end) : 0;

  if (isLoading) return <div className="p-10 text-center animate-pulse">Loading Market Data...</div>
    
  return (
    <div ref={tableContainerRef} className="h-150 overflow-auto border rounded-md bg-white shadow-sm relative" tabIndex={0}>
        <table className="w-full text-sm text-left border-collapse" aria-label="Cryptocurrency Market Data" aria-rowcount={rows.length}>
            <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
                {table.getHeaderGroups().map((group) => (
                    <tr key={group.id}>
                        {
                            group.headers.map((header) => (
                                <th key={header.id} className="p-4 font-semibold text-gray-700 border-b" scope="col">
                                    {
                                        header.isPlaceholder ?
                                        null :
                                        flexRender(header.column.columnDef.header, header.getContext())
                                    }
                                </th>
                            ))
                        }
                    </tr>
                ))}
            </thead>
            <tbody>
                {
                    paddingTop > 0 && (
                        <tr>
                           <td style={{ height: `${paddingTop}px`}}></td> 
                        </tr>
                    )
                }
                    
                {
                    virtualItems.map((virtualRow) => {
                        const row = rows[virtualRow.index];

                        return (
                            <tr
                                key={row.id}
                                className="border-b hover:bg-gray-50 transition-colors"
                                style={{ height: `${virtualRow.size}px` }}
                                aria-rowindex={virtualRow.index + 1}
                            >
                                {
                                    row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className={`p-4 ${cell.column.id === 'name' ? 'w-[50%]' : 'w-[25%]'}`}>
                                            { flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))
                                }
                            </tr>
                        )
                    })
                }

                {
                    paddingBottom > 0 && (
                        <tr>
                           <td style={{ height: `${paddingBottom}px` }}></td> 
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}