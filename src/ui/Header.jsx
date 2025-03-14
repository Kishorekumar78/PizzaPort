import { Link, useNavigate } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import Username from '../features/user/Username';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { updateName } from '../features/user/userSlice';
import { clearCart } from '../features/cart/cartSlice';

function Header() {
  const username = useSelector((state) => state.user.username);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(updateName(''));
    dispatch(clearCart());

    navigate('/');
  }
  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-red-400 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="tracking-widest">
        Pizza Port
      </Link>

      <SearchOrder />
      <Username />

      {username && (
        <Button type="primary" className="w-72" onClick={handleLogout}>Logout</Button>
      )}
    </header>
  );
}

export default Header;
