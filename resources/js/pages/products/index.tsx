import { Head, Link, useForm, usePage } from '@inertiajs/react';
//import { route } from 'ziggy-js';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import {products} from '@/routes';
import { Button } from '@/components/ui/button';
import { create} from '@/routes/products';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Megaphone } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Procucts',
        href: products().url,
    },
];



export default function Index() {
   const { products,flash } = usePage().props;
   // Tell usePage that this specific page also has a 'products' array
    //const { products, flash } = usePage<PageProps<{ products: Product[] }>>().props;
    const { processing, delete: destroy } = useForm();
 
    const handleEdit = (id:number,name:string) => {
      // Perform edit action here, e.g., navigate to the edit page
      console.log("Edit product:", id);
    }

    const handleDelete = (id:number,name:string) => {
      if (confirm(`Are you sure you want to delete the product "${name}"?`)) {
        // Perform delete action here, e.g., send a request to the server
             //destroy(`/products/${id}`);
             destroy(route('products.destroy', { product: id }))
             
      }
    }
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className='m-4'>
               <Link href={create().url}><Button> Create a Product</Button></Link>
            </div>
            <div className='m-4'>
                <div >
                    {flash.success && (
                <Alert>
                    <Megaphone className="h-4 w-4" />
                    <AlertTitle>Notification!</AlertTitle>
                        <AlertDescription className='text-green-800'>
                        {flash.success}
                        </AlertDescription>
                </Alert>
                    )}
            
                </div>
            </div>
          <div className='m-4'>
            <Table>
                <TableCaption>A list of your recent products.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-25">ID</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell className="text-center">${product.price}</TableCell>
                    <TableCell className="text-center">
                        <Link href={route('products.edit', { product: product.id })}><Button variant="outline" size="sm" className='bg-slate-500 hover:bg-slate-700 text-white'>Edit</Button></Link>
                        <Button disabled={processing} onClick={() => handleDelete(product.id,product.name)} variant="outline" size="sm" className="ml-2 bg-red-500 hover:bg-red-700 text-white">Delete</Button>
                    </TableCell>
                  </TableRow>
                  ))}
                  </TableBody>
            </Table>
          </div>
        </AppLayout>
                    )};