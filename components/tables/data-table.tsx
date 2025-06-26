'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  title: string;
  searchKey?: string;
  onRowClick?: (item: any) => void;
  movePageOnRowClick?: boolean;
  rowLink?: string;
}

export default function DataTable({ data, columns, title, searchKey = 'name', onRowClick, movePageOnRowClick, rowLink }: DataTableProps) {
  const router = useRouter();
  
    const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const filteredData = data.filter(item =>
    item[searchKey]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    Object.values(item).some(value => 
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const renderCellValue = (value: any, key: string) => {
    if (key === 'status') {
      return (
        <Badge 
          variant={
            value === 'Active' || value === 'Completed' 
              ? 'secondary' 
              : value === 'Pending' || value === 'Processing'
              ? 'outline' 
              : 'destructive'
          }
        >
          {value}
        </Badge>
      );
    } else if (key === 'isActive') {
        return (
            <Badge
                variant={
                    value ? 'secondary' : 'destructive'
                }
            >
                {value ? 'Active' : 'Inactive'}
            </Badge>
        );
    } else if (key === 'isFulfillable') {
        return (
            <Badge
                variant={
                    value ? 'secondary' : 'destructive'
                }
            >
                {value ? 'Fulfillable' : 'Not Fulfillable'}
            </Badge>
        );
    }
    
    if (typeof value === 'number' && (key.includes('price') || key.includes('cost') || key.includes('total') || key.includes('Value'))) {
      return `$${value.toLocaleString()}`;
    }
    
    return value;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="border rounded-lg bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              {columns.map((column) => (
                <TableHead 
                  key={column.key}
                  className={`font-semibold text-slate-700 ${column.sortable ? 'cursor-pointer hover:bg-slate-100' : ''}`}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  {column.label}
                  {sortConfig?.key === column.key && (
                    <span className="ml-1">
                      {sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((item, index) => (
              <TableRow 
                key={index} 
                className={`hover:bg-slate-50 ${onRowClick ? 'cursor-pointer' : ''}`}
                onClick={() => {
                    onRowClick?.(item)

                    if (!onRowClick && movePageOnRowClick && item.id && rowLink) router.push(rowLink.replace('[id]', item.id.toString()));
                }}
              >
                {columns.map((column) => (
                  <TableCell key={column.key} className="text-slate-900">
                    {renderCellValue(item[column.key], column.key)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}