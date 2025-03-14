import { useFetcher, useLoaderData, useNavigate } from 'react-router-dom';

import OrderItem from './OrderItem';

import { getOrder } from '../../services/apiRestaurant';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import { useEffect, useState } from 'react';
import UpdateOrder from './UpdateOrder';
import Button from '../../ui/Button';

function Order() {
  const order = useLoaderData();
  const fetcher = useFetcher();

  const [showPopup, setShowPopup] = useState(true);

  const closePopup = () => setShowPopup(false);

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
    },
    [fetcher]
  );

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <>
      <div className="space-y-8 px-4 py-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-semibold">Order #{id} status</h2>

          <div className="space-x-2">
            {priority && (
              <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
                Priority
              </span>
            )}
            <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
              {status} order
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
          <p className="font-medium">
            {deliveryIn >= 0
              ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
              : 'Order should have arrived'}
          </p>
          <p className="text-xs text-stone-500">
            (Estimated delivery: {formatDate(estimatedDelivery)})
          </p>
        </div>

        <ul className="dive-stone-200 divide-y border-b border-t">
          {cart.map((item) => (
            <OrderItem
              item={item}
              key={item.pizzaId}
              isLoadingIngredients={fetcher.state === 'loading'}
              ingredients={
                fetcher?.data?.find((el) => el.id === item.pizzaId)
                  ?.ingredients ?? []
              }
            />
          ))}
        </ul>

        <div className="space-y-2 bg-stone-200 px-6 py-5">
          <p className="text-sm font-medium text-stone-600">
            Price pizza: {formatCurrency(orderPrice)}
          </p>
          {priority && (
            <p className="text-sm font-medium text-stone-600">
              Price priority: {formatCurrency(priorityPrice)}
            </p>
          )}
          <p className="font-bold">
            To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
          </p>
        </div>

        {!priority && <UpdateOrder order={order} />}
      </div>

      {showPopup && (
        <PopupContent onClose={closePopup} />
      )}
    </>
  );
}

export const PopupContent = ({ onClose }) => {
  const navigate = useNavigate();

  const redirectToMenu = () => navigate('/menu');

  return (
    <div className="fixed inset-0 flex
                        items-center justify-center
                        bg-black bg-opacity-50">
      <div className="bg-white rounded-lg
                            shadow-lg p-6 max-w-md
                            w-full relative">
        <div className="flex items-center justify-center">
          Order Placed Succesfully
        </div>

        <div className="mt-6 space-x-2 flex items-center justify-center">
          <Button onClick={onClose} type="primary" className="mr-10">
            View Details
          </Button>

          <Button type="secondary" onClick={redirectToMenu}>
            Order Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
