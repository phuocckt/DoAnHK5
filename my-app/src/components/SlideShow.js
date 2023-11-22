import Carousel from 'react-bootstrap/Carousel';

function IndividualIntervalsExample() {
  return (
    <Carousel>
      <Carousel.Item interval={1000}>
        <img src="https://t3.ftcdn.net/jpg/05/36/02/06/360_F_536020641_rprZK7Kg8Cx6EtU7RJOjkLrdLNp6sB6a.jpg"/>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
      <img src="https://t4.ftcdn.net/jpg/00/87/75/89/360_F_87758970_sjqJO7Q3aGmh514hzDufPiInLwWrgPLO.jpg"/>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src="https://t3.ftcdn.net/jpg/03/51/48/02/360_F_351480249_SqjA3UHUYVMv3322MNMXU75s5pDAUvHm.jpg"/>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default IndividualIntervalsExample;