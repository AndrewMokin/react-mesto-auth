import Main from "../Main/Main";
import Footer from "../Footer/Footer";

function MainFooter({...props}) {
  return (
    <div>
      <Main {...props}/>
      <Footer/>
    </div>
  )
}

export default MainFooter
