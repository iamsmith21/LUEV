import { Link } from 'react-router-dom';
function Admin() {
  return (
<div className='flex flex-col gap-2 m-10'>
<Link to="/sales">Run Reports on vehicle sales</Link>
<Link to="/usage">Run Reports on application usage</Link>
</div>
  )
}

export default Admin