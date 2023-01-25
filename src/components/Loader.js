import ContentLoader from "react-content-loader"

function Loader() {
    return(
        
        <ContentLoader 
        speed={2}
        width={400}
        height={96}
        viewBox="0 0 400 96"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="4" y="12" rx="3" ry="3" width="88" height="6" /> 
        <rect x="25" y="73" rx="0" ry="0" width="2" height="0" /> 
        <rect x="6" y="37" rx="0" ry="0" width="70" height="40" /> 
        <rect x="166" y="37" rx="0" ry="0" width="70" height="40" /> 
        <rect x="84" y="37" rx="0" ry="0" width="70" height="40" />
      </ContentLoader>
    )
    
}

export default Loader