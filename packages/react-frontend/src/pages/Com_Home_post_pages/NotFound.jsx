export default function NotFound(props) {
  if(props.communityName && props.postHeader){
    return <h1>Hello! Post {props.communityName}/{props.postHeader} does not exist</h1>;
  }else if (props.communityName){
    return <h1>Hello! Community {props.communityName} does not exist</h1>;
  } else {
  return <h1>404 Not Found</h1>;
  }
}
