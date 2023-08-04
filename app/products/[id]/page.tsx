import AddToCartButton from '@/app/components/Product/AddToCartButton';

async function getData(id: string) {
  const res = await fetch('https://fakestoreapi.com/products/' + id).then(res => res.json());

  return res;
}



export default async function ProductDetailPage({
  params: {
    id
  }
}) {

  const product = await getData(id);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold leading-7 text-gray-900 sm:text-4xl sm:truncate">
              {product.title}
            </h1>
            <p className="mt-1 text-lg text-gray-500">{product.description}</p>
            <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
            <AddToCartButton product={product} />
          </div>
          <div className="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
            <img
              className="h-64 w-auto object-contain"
              src={product.image}
              alt={product.title}
            />
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-lg font-medium text-gray-900">Details</h2>
          <div className="mt-4 prose prose-indigo prose-lg text-gray-500">
            <p>{product.details}</p>
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-lg font-medium text-gray-900">Reviews</h2>
          <div className="mt-4 prose prose-indigo prose-lg text-gray-500">
            <p>No reviews yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

