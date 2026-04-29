const CartHeader = () => {
  return (
    <div className="bg-gradient-to-r from-amber-700 via-red-700 to-amber-700 px-4 py-8 text-white md:px-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-2xl font-bold md:text-3xl">
          Your Shopping Cart
        </h1>
        <p className="text-sm text-amber-100">
          Review and modify your items before checkout
        </p>
      </div>
    </div>
  );
};

export default CartHeader;
