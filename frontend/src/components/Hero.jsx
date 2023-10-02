import { Container, Card, Button } from 'react-bootstrap';

const Hero = () => {
  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>Welcome to MYBYK </h1>
          <p className='text-center mb-4'>
          The electric bike boasts of several features
 such as a Bluetooth-based connected bike 
experience with the MYBYK app, keyless 
cycle unlocking, keyless battery unlocking,
 swappable battery designed for a capacity 
of 0.54 KwH giving a range of 80-100 kms
 depending on conditions.
          </p>
          <div className='d-flex'>

          <Button
          type='submit'
          variant='success'
          className='mt-3'
          style={{ backgroundColor: '#3BED2B', borderColor: '#6EFA3D', width: '200px' }}
        >
          Get MYBYK in your City
        </Button>



           
            {/* <Button variant='secondary' href='/register'>
              Register
            </Button> */}
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;