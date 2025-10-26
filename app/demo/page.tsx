import Link from 'next/link';
import { Button } from '@mantine/core';

  
const page = () => {
  return (
    <div>
      <Button>Hello Mantine</Button>
      <div>
        <Link href="/">Go to Home</Link>
      </div>
    </div>
  )
}

export default page;