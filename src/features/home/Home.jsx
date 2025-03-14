import { useSelector } from 'react-redux';
import Button from '../../ui/Button';
import CreateUser from '../user/CreateUser';

function Home() {
  const username = useSelector((state) => state.user.username);

  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="mb-8  text-xl font-semibold md:text-3xl">
        The best pizza ever
        <br />
        <br />
        <span className="text-orange-500">
          Hot, Fresh, Fast — Your Perfect Pizza, Just a Click Away!
        </span>
      </h1>

      {username === '' ? (
        <CreateUser />
      ) : (
        <Button to="/menu" type="primary">
          Continue ordering, {username}
        </Button>
      )}
    </div>
  );
}

export default Home;
