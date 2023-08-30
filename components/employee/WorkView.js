import React, {useEffect, useRef, useState} from "react";
import {getUserCredentialsFromLocalStorage} from "@/util/storage";
import {httpGET, httpPOST} from "@/service/network-configs/http/service";
import {BASE_URL} from "@/service/network-configs/http/basicConfig";
import {CREATE_NEW_WORKS, GET_SPECIFIC_CLIENTS, GET_WORKS, SUBMIT_A_WORKS} from "@/service/api-endpoints/works";
import {notify, notifyStatus} from "@/util/notify";
import Button from "@/components/button";
import Toaster from "@/components/Toaster";


const category = [
    "new","submitted"
]

export default function  WorkView(props){
       const[empWorks,setEmpWorks] =  useState([]);
       const[visible,setVisible] =  useState([]);
       const[details,setDetails] =  useState([]);
       const[workUri,setWorkUri] =  useState('');
       const fileInputRef5 = useRef(null);

    const handleClick = () => {
        fileInputRef5.current.click();
    };
    const handleFileChange = (event) => {

        try{

            const file = event.target.files[0];
            const fileUri = URL.createObjectURL(file);
            URL.revokeObjectURL(file);

            //setBuinessRegPdfUri({value:fileUri,bool:false});
            console.log('File URI:', fileUri);
            const fileUrl = URL.createObjectURL(file);
            setWorkUri(fileUrl);

            if (file) {
                const fileName = file.name;
                const fileExtension = fileName.split('.').pop();
                postWork(fileUrl,fileExtension);
            }

        }catch(err){
            console.log(err)
        }

    };

    // private String clientId;
    // private String employeeId;
    // private String employeeName;
    // private String jobId;           // jobId is identify unique job
    // private Works workInfo;
    // private LocalDate givenDate;
    // private LocalDate deadline;
    // private String workStatus;
    // private LocalDate submittedDate;


    async function convertBlobURLToBlob(blobURL) {
        const response = await fetch(blobURL);
        const blob = await response.blob();
        return blob;
    }

    async function  postWork(file,extention){

        const { access_token, refresh_token, userRole, userId }  = getUserCredentialsFromLocalStorage();
        const adDetails = {

            "clientId": props.clientId,
            "employeeId":  userId,
            "jobId": details?.jobId,
            "workInfo":{
                "title":details?.workInfo?.title,
                "category" : details?.workInfo?.category,
                "description":details?.workInfo?.description,
                "docUrl":details?.workInfo?.docUrl,
                "docUrl2":"",

            },
            "givenDate": details?.givenDate,
            "deadline": details?.deadline,
            "workStatus": "Submitted" ,

        };

        console.log(adDetails);

        const url = BASE_URL + SUBMIT_A_WORKS;

        const headers = {

        };

        const doc = await convertBlobURLToBlob(file)

        let bodyFormData = new FormData();
        bodyFormData.append("submitWorks", JSON.stringify(adDetails));
        bodyFormData.append("doc" , doc,"."+extention  );

        const response = await httpPOST(url,bodyFormData,'multipart/form-data',headers)

        if(response?.status === 200){

            console.log(response.data);
            notify(notifyStatus.SUCCESS,"submit success full")

        }else if(response?.status === 400){

            notify(notifyStatus.ERROR,"Failed  please try again XXXXXXXXXXX")
        }else{

            notify(notifyStatus.ERROR,"Failed  please try again XXXXXXXXX")
        }

    }


    function submitAWork(){
        //SUBMIT_A_WORKS
    }

    async function  getAllClients(){

        const { access_token, refresh_token, userRole, userId }  = getUserCredentialsFromLocalStorage();
        const header = {
            "employeeId" : userId,
            "clientId" : props.clientId,
        }

        console.log(header)
        const response = await httpGET(BASE_URL + GET_WORKS,header)

        if(response?.status === 200 ) {
            //setCompanyDetails(response?.data);
            setEmpWorks(response?.data)

        }else if (response?.status == 400){
            //  notify(notifyStatus.ERROR,response.message)
        }else if (response?.status >= 403){
            notify(notifyStatus.ERROR,"ddd")
        }
    }

    useEffect(()=>{
         getAllClients();
    },[])
       return(
           <div style={{position:'absolute',top:'120px',left:'0px',right:'0px',bottom:'0px',margin:'auto',width:'85vw',height:'80vh',backgroundColor:'rgba(255,255,255)',display:props?.visible ? "flex": "none"}}>
               <div style={{position:'absolute',right:'0',margin:'5px',cursor:"pointer" }} onClick={()=>props.onClick(false)}>
                   <img src={"/images/common/close.png"} width="40px" />
               </div>
               <div style={{ width:'100%',height:'100%'}}>

                   <div style={{width:'100%',height:"50px",marginTop:'10px'}}>

                       <div style={{display: 'flex', flexDirection: 'row'}}>
                           <select className='box-shadow-type-one' style={{borderRadius:'10px',width:  '15%',paddingLeft:'10px',height:"40px",margin:'10px'}} onChange={(e)=>{


                           }} >
                               <option style={{fontSize:'12px' , width:'20%' , paddingLeft:'20px'}} value={"All"} selected>All</option>
                               {
                                   category?.map((item, index) => (
                                       <option style={{fontSize:'12px' , width:'100%' , paddingLeft:'20px'}} value={item}  key={index}>{item}</option>
                                   ))
                               }
                           </select>

                       </div>
                   </div>
                   <div className='box-shadow-type-two' style={{ width:'100%',height:"90%",marginTop:'10px',display:'flex',flexDirection:'row'}}>
                       <div style={{ width:'50%',height:"100%",marginTop:'10px',display:'flex',flexDirection:'column',overflowY:'scroll',alignItems:'center'}}>



                           {
                               empWorks?.map((data,index)=>{

                                   return(
                                       <div className='box-shadow-type-two' style={{ width:'300px',height:"90px",marginTop:'10px',display:'flex',flexDirection:'row',borderRadius:'10px',alignItems:'center'}} onClick={()=>{setDetails(data)}}>
                                           <div style={{display:'flex',flexDirection:'column',width:"80%"}}>
                                               <div style={{ width:'100%',height:"30px",marginTop:'10px',display:'flex',flexDirection:'column',paddingLeft:'20px'}}>
                                                   <label style={{fontSize:'20px',fontWeight:'500'}}>{data?.workInfo?.title}</label>
                                                   <label style={{fontSize:'12px',fontWeight:'500'}}>{data?.workInfo?.description}</label>
                                               </div>
                                               <div style={{width:'100%',height:"30px",marginTop:'10px',display:'flex',flexDirection:'column',justifyContent:"space-between",alignItems:'center'}}>
                                                   <label style={{fontSize:'12px',fontWeight:'400'}}>{data?.workInfo?.givenDate}</label>
                                                   <label>{data?.workInfo?.deadline}</label>
                                               </div>

                                           </div>
                                       </div>
                                   )
                               })
                           }

                       </div>

                       <div  style={{ width:'600px',height:"100%",marginTop:'10px',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                           <div className='box-shadow-type-one' style={{width:'80%',height:'80%',display:'flex',flexDirection:'column'}}>
                               <div style={{height:'50px',width:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
                                   <label style={{fontSize:'20px',fontWeight:'500'}}>{details?.workInfo?.title}</label>
                               </div>
                               <div style={{height:'80%',display:'flex',flexDirection:'column',width:'100%',alignItems:'center'}}>
                                   <div>
                                       <label>{details?.workInfo?.description}</label>
                                   </div>
                                   <div style={{width:"70%",display:'flex',flexDirection:'row',columnGap:'100px'}}>

                                       <div style={{width:'100px',display:"flex",alignItems:'center',flexDirection:'column',paddingTop:'5px'}}>

                                           <div style={{width:'100px',height:'100px',backgroundSize: 'cover',backgroundPosition: 'center', backgroundImage:`url(data:image/png;base64,${details?.profileImageUri})`}}/>

                                           {details?.workInfo?.docUrl != null ?  <a href={details?.workInfo?.docUrl} target={"_blank"}><label style={{color:'blue',cursor:'pointer'}}>Get Task</label></a> : ''}
                                       </div>

                                       <div style={{width:'100px',display:"flex",alignItems:'center',flexDirection:'column'}}>

                                           <div style={{width:'100px',height:'100px',backgroundSize: 'cover',backgroundPosition: 'center', backgroundImage:`url(data:image/png;base64,${details?.workInfo?.docUrl2})`}}/>

                                           {details?.workInfo?.docUrl2 != null ?
                                                  <div>
                                                      <Button title={"Submit"} width={"100px"} height={"35px"} color={"white"} backgroundColor={"#6149D8"} onClick={()=>{handleClick(); }} />
                                                      <input
                                                          id="fileInputProfileX"
                                                          ref={fileInputRef5}
                                                          type="file"
                                                          onChange={handleFileChange}
                                                          accept="*"
                                                          style={{ display: 'none' }}
                                                      />
                                                  </div>
                                               : ''}
                                       </div>
                                   </div>

                                   <div style={{display:'felx',flexDirection:'column',alignSelf:'flex-start',margin:'10px',width:"400px"}}>

                                       <div style={{display:'flex',flexDirection:'row',columnGap:'10px',margin:'10px'}}>
                                           <lable>Title : </lable>
                                           <lable>{details?.workInfo?.title}</lable>
                                       </div>


                                       <div style={{display:'flex',flexDirection:'row',columnGap:'10px',margin:'10px'}}>
                                           <lable>JobCategory : </lable>
                                           <lable>{details?.workInfo?.category}</lable>
                                       </div>

                                       <div style={{display:'flex',flexDirection:'row',columnGap:'10px',margin:'10px'}}>
                                           <lable>Description : </lable>
                                           <lable>{details?.workInfo?.description}</lable>
                                       </div>

                                       <div style={{display:'flex',flexDirection:'row',columnGap:'10px',margin:'10px'}}>
                                           <lable>givenDate  : </lable>
                                           <lable>{details?.givenDate}</lable>
                                       </div>

                                       <div style={{display:'flex',flexDirection:'row',columnGap:'10px',margin:'10px'}}>
                                           <lable>deadLine  : </lable>
                                           <lable>{details?.deadline}</lable>
                                       </div>

                                   </div>

                               </div>

                           </div>


                       </div>


                   </div>



               </div>
               <Toaster/>
           </div>
       )
}
