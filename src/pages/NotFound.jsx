
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const naviaget = useNavigate()
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button onClick={()=>naviaget("/login")} type="primary">Back Login</Button>}
      />
    </div>
  )
}

export default NotFound