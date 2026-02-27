import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import {products} from '@/routes';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { create, edit, store } from '@/routes/products';
import { Textarea } from '@/components/ui/textarea';
import { CircleAlert, InfoIcon } from 'lucide-react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";


interface Product {
     id: number; // Added ID as it is required for the update route
    name: string;
    price: string;
    description: string;
}

export default function Edit({ product }: { product: Product }) { 
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Edit Product',
            href: route('products.edit', { product: product.id }),
        },
    ];
 const { products,flash } = usePage().props;
 
const { data, setData, patch, processing, errors } = useForm<Product>({
     id: product.id, 
    name: product.name || '',
    price: product.price || '',
    description: product.description || '',
})

const handleUpdate = (e: React.FormEvent) => {
  e.preventDefault();
   patch(route('products.update', { product: product.id }));
}

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${product.name}`} />
            <div className='w-8/12 p-4'>
                <form onSubmit={handleUpdate} className='space-y-4'>

                    {/* Display validation errors if any */}
                    {Object.keys(errors).length > 0 && (
                        <Alert>
                            <CircleAlert className="h-4 w-4" />
                            <AlertTitle>Errors!</AlertTitle>
                            <AlertDescription className='text-red-500'>
                                <ul>
                                    {Object.entries(errors).map(([key, message]) => (
                                        <li key={key}>{message as string}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                            </Alert>
                    )}
                    <div className='gap-1.5'>
                        <Label htmlFor="name">Product Name</Label>
                        <Input id="name" placeholder="Product Name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                    </div>
                     <div className='gap-1.5'>
                        <Label htmlFor="price">Price</Label>
                        <Input id="price" placeholder="Price" value={data.price} onChange={(e) => setData('price', e.target.value)} />
                    </div>
                     <div className='gap-1.5'>
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" placeholder="Description" value={data.description} onChange={(e) => setData('description', e.target.value)}  />
                    </div>
                    <Button disabled={processing} type="submit">Update Product</Button>
                </form>
            </div>           
        </AppLayout>

    );
}