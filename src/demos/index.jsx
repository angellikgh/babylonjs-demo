import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <ul className="text-left">
      <li>
        <Link to="/demo01">01. Rectangle</Link>
      </li>
      <li>
        <Link to="/demo02">02. House (loadedModel)</Link>
      </li>
      <li>
        <Link to="/demo03">03. House</Link>
      </li>
      <li>
        <Link to="/demo04">04. Street</Link>
      </li>
    </ul>
  );
};

export default Main;
