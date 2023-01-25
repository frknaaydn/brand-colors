import { useContext, useEffect, useState } from "react"
import MainContext from "../MainContext"
import {GrLink,GrDownload,GrClose} from "react-icons/gr"
import { Link } from "react-router-dom"


function Download() {
    
    const {brands,selectedBrands,setSelectedBrands} = useContext(MainContext)
    const [downloadUrl, setDownloadUrl] = useState()
    const [cssMethod, setCssMethod] = useState('css')

 /* 
  ! Blob nesnesi ile dowland yaptık ! 
  ? Mantık,
  ? useEffect yazdık ve selectedBrands'ler değişikliğe uğradıkları zaman harekete geçecek. 
  ? selectedBrands 0 dan büyükse içersiindeki seçilenleri yani brandlari, brandların da içlerindeki
  ? color ve keyleri oluşturdugumuz degiskene "output" ' a atadık. sonra da blob nesnesi ile 
  ? yeni bir nesne olusturduk. Olusturdugumuz output değişkenini array olarak atadık. sonrsında
  ? URL.createObjectURl dedik. url değişkenine atadık ve setDOwlandUrl dedil. SOn olarak da return ile içerini temizledik.
  * tabi bunu en basta nasıl kontrol eettk ?
  * aşağıda a html tag'ına (resim olarak da GrDowland demiştik) href atadık ve içerisine useState'de tanımlı olan (yukarda tanımladık)
  * * downlandURL atadık. yukardaki işlemlerde de setDowlandUrl işlem yapmıştık zaten. setState mantığını burda setDowlanUrl ile biz yaptk
  * * useState kullanarak yaptık !!

 */

    useEffect(() => {
        
        if (selectedBrands.length > 0) {

            let output ='';
            switch (cssMethod) {
                case 'css':
                        output += 'root {\n'
                        selectedBrands.map(slug => {
                        let brand = brands.find(brand=> brand.slug === slug) 
                        brand.colors.map((color,key)=>{
                            output +=`--${slug}-${key}: #${color};\n`
                            })
                        })
                        output += '}'
                    break;
                
                case 'scss':
                    
                        selectedBrands.map(slug => {
                        let brand = brands.find(brand=> brand.slug === slug) 
                        brand.colors.map((color,key)=>{
                            output +=`\$${slug}-${key}: #${color};\n`
                            })
                        })

                break;


                case 'less':
                        
                        selectedBrands.map(slug => {
                        let brand = brands.find(brand=> brand.slug === slug) 
                        brand.colors.map((color,key)=>{
                            output +=`@${slug}-${key}: #${color};\n`
                            })
                        })

                break;
            
            }



           
            
            const blob = new Blob([output])
            const url = (URL.createObjectURL(blob))
            setDownloadUrl(url);    // setDowloadUrl'ı useState ile biz oluşturduk yukarda !!!
            return () =>{
                URL.revokeObjectURL(url)
                setDownloadUrl('');
            }
        }
   


       }, [selectedBrands,cssMethod])

  

    return(
        <div className="download">
            <div className="actions">
                <select onChange={(e) => setCssMethod(e.target.value)}>
                    <option value="css">CSS</option>
                    <option value="scss">SCSS</option>
                    <option value="less">LESS</option>

                </select>
                <a download={`brands.${cssMethod}`} href={downloadUrl} >
                    <GrDownload/>
                </a>

                <Link to={`/collection/${selectedBrands.join(',')}`}>
                    <GrLink/>
                </Link>

            </div>
            <div className="selected">
            <button  onClick={()=> setSelectedBrands([])}><GrClose/></button>
            {selectedBrands.length} brands collected

            </div>
        </div>
    )
}

export default Download