import React,{useEffect,useState} from 'react'
import TextField from "@/components/textField";
import {TEXT} from "@/util/regXConstents";
import {getUserCredentialsFromLocalStorage} from "@/util/storage";
import {httpGET} from "@/service/network-configs/http/service";
import {BASE_URL} from "@/service/network-configs/http/basicConfig";
import {GET_SPECIFIC_CLIENTS, GET_WORKKS_BY} from "@/service/api-endpoints/works";
import {notify, notifyStatus} from "@/util/notify";
import Button from "@/components/button";


export default function ViewAll() {

        const[companyDetails,setCompanyDetails] = useState([]);
    async function  getAllClients(){

        const { access_token, refresh_token, userRole, userId }  = getUserCredentialsFromLocalStorage();
        const header = {
            "userId" : userId,
        }
        const response = await httpGET(BASE_URL + GET_SPECIFIC_CLIENTS,header)

        if(response?.status === 200 ) {
            setCompanyDetails(response?.data);
            console.log(response?.data[0]);
        }else if (response?.status == 400){
            //  notify(notifyStatus.ERROR,response.message)
        }else if (response?.status >= 403){
            notify(notifyStatus.ERROR,"ddd")
        }
    }

    useEffect(()=> {
        getAllClients();
    },[])

    return(
        <div style={{width:"inherit",height:'inherit'}}>
            <div style={{display:'flex',flexDirection:'row',flexWrap:'nowrap',padding:'20px'}}>
                  <div className="box-shadow-type-two" style={{width:'250px',height:'300px',borderRadius:'10px',display:'flex',alignItems:'center',padding:'10px',flexDirection:'column'}}>
                      <div style={{width:'80px',display:'flex',alignItems:'center',flexDirection:'column'}}>
                          <div style={{width:'80px',height:'80px',borderRadius:'100%',backgroundImage:`url(${companyDetails[0]?.profileImageUri})`}}/>
                          <label>{companyDetails[0]?.businessName }</label>
                      </div>

                      <div style={{display:'flex',flexDirection:'column',margin:'10px'}}>
                          <label>owner :{companyDetails[0]?.owner}</label>
                          <label>email :{companyDetails[0]?.owner}</label>
                          <label>tel :{companyDetails[0]?.owner}</label>
                      </div>

                      <div  style={{margin:'10px'}}>
                          <Button title={"View"} width={"100px"} height={"35px"} color={"white"} backgroundColor={"#6149D8"} onClick={()=>{}} />
                      </div>


                  </div>
            </div>

        </div>
    );


}
