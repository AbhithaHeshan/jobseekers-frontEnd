import Button from "@/components/button";
import React,{useState,useRef, useEffect} from "react";
import Image from "next/image";
import { getUserCredentialsFromLocalStorage } from "@/util/storage";
import { BASE_URL } from "@/service/network-configs/http/basicConfig";
import { CREATE_NEW_APPLICATION } from "@/service/api-endpoints/application";
import { httpPOST } from "@/service/network-configs/http/service";
import { useRouter } from 'next/router';
import TextField from "@/components/textField";
import Loarder from "@/components/Loarder";
import Toaster from "@/components/Toaster";
import { notify, notifyStatus } from "@/util/notify";

export default function ViewAndApply() {

      const[cvUri,setCvUri] = useState("");
      const[name,setName] = useState("");
      const[address,setAddress] = useState("");
      const[email,setEmail] = useState("");
      const[tel,setTel] = useState("");
      const[additional,setAdditionals] = useState("");
      const[isLoading,setLoading] = useState(false);
      const fileInputRef3 = useRef(null);
      const router = useRouter();
      const details = router.query;


      async function convertBlobURLToBlob(blobURL) {
            const response = await fetch(blobURL);
            const blob = await response.blob();
            return blob;
      }

      const handleFileChangeCvUri = (event) => {

            try {
              const file = event.target.files[0];
              const fileUri = URL.createObjectURL(file);
              console.log('File URI:', fileUri);

              const fileUrl = URL.createObjectURL(file);
              setCvUri(file);
              console.log("URL: ", fileUrl);
            } catch (err) {
              console.log(err);
            }

      };

      const handleClickCvUri = () => {
            fileInputRef3.current.click();
      };

      async function submit(){
           console.log(details , "bbb ");
        const { access_token, refresh_token, userRole, userId:empId} = getUserCredentialsFromLocalStorage();

        const data = {

                  "applicationId":"",
                  "name": name,
                  "address": address,
                  "dateOfBirth": "1990-01-01",
                  "email": email,
                  "telOne": tel,
                  "telTwo": "xxxxxxxxxxx",
                  "workingType": details?.workingType,
                  "cvUri": "",
                  "additionalQualifications": additional,
                  "userId": "",
                  "jobCatogary": details?.jobType,
                  "jobRoleType": details?.clarification
         }

         const url = BASE_URL + CREATE_NEW_APPLICATION;

         const headers = {
            "employeeUserId":empId,
            "clientUserId" : details?.userId
         };

         const cvUriBlob = await convertBlobURLToBlob(cvUri)
          console.log(cvUriBlob   ,  "   "  , cvUri)
         let bodyFormData = new FormData();
         bodyFormData.append("application",JSON.stringify(data));
         bodyFormData.append("cv" , cvUri ,'.pdf');

         const response = await httpPOST(url,bodyFormData,'multipart/form-data',headers)

         if(response?.status === 200){
                 setLoading(false);
                 notify(notifyStatus.SUCCESS,"Application Submitted")
                 setTimeout(function() {
                   router.replace("/login/employee/page")
                 }, 2500);

         }else if(response?.status >= 400){
            notify(notifyStatus.ERROR,"Failed to submit application")
         }else{
            notify(notifyStatus.ERROR,"Failed to submit application")
         }

     }


      return(
           <div style={{height:'100vh',display:'flex',alignItems:"center",justifyContent:'center'}}>
               <div className='box-shadow-type-two' style={{width:'500px',height:'500px',display:'flex',flexDirection:'column',alignItems:'center',borderRadius:''}}>
                     <div style={{margin:'20px'}}>

                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <label style={{fontFamily: 'inter', fontSize: '13px'}}>Name </label>
                            <TextField
                                width={"420px"}
                                height={"40px"}
                                placeholder={"period ex - 3 months , permenent"}
                                borderRadius={"10px"}
                                type={"text"}
                                onChange={(e) => {
                                    setName(e.value)
                                }}
                                value={name}
                            />
                        </div>


                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <label style={{fontFamily: 'inter', fontSize: '13px'}}>Address </label>
                            <TextField
                                width={"420px"}
                                height={"40px"}
                                placeholder={"period ex - 3 months , permenent"}
                                borderRadius={"10px"}
                                type={"text"}
                                onChange={(e) => {
                                    setAddress(e.value)
                                }}
                                value={address}
                            />
                        </div>


                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <label style={{fontFamily: 'inter', fontSize: '13px'}}>Email </label>
                            <TextField
                                width={"420px"}
                                height={"40px"}
                                placeholder={"period ex - 3 months , permenent"}
                                borderRadius={"10px"}
                                type={"text"}
                                onChange={(e) => {
                                    //setPeriod({value: e.value, bool: e.bool})
                                    setEmail(e.value)
                                }}
                                value={email}
                            />
                        </div>

                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <label style={{fontFamily: 'inter', fontSize: '13px'}}>Tel
                            </label>
                            <TextField
                                width={"420px"}
                                height={"40px"}
                                placeholder={"period ex - 3 months , permenent"}
                                borderRadius={"10px"}
                                type={"text"}
                                onChange={(e) => {
                                    //setPeriod({value: e.value, bool: e.bool})
                                    setTel(e.value)
                                }}
                                value={tel}
                            />
                        </div>


                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <label style={{fontFamily: 'inter', fontSize: '13px'}}>Additional-Qualifications </label>
                            <TextField
                                width={"420px"}
                                height={"40px"}
                                placeholder={"period ex - 3 months , permenent"}
                                borderRadius={"10px"}
                                type={"text"}
                                onChange={(e) => {
                                    //setPeriod({value: e.value, bool: e.bool})
                                    setAdditionals(e.value)
                                }}
                                value={additional}
                            />
                        </div>
                     </div>
                     <div style={{width:'90%',height:'90%'}}>
                           <div className='box-shadow-type-two'  style={{height:'70px',width:'100%',borderRadius:'10px',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'row'}}>

                                     <div style={{width:'90%',display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}>
                                          <Button title={"Upload CV"} width={"80%"} height={"35px"} color={"white"} backgroundColor={"#8B7AE0"} onClick={()=>{handleClickCvUri()}} />
                                          <Image  width={10} height={10} src={cvUri != '' ? "/images/signup/client/correct.gif" : "/images/signup/client/1.png"} style={{width:'20px',position:'absolute',right:'50px',margin:'auto'}} className='border'/>
                                     </div>

                                     <input
                                        id="fileInput"
                                        ref={fileInputRef3}
                                        type="file"
                                        onChange={handleFileChangeCvUri}
                                        accept="application/pdf"
                                        style={{ display: 'none' }}
                                      />

                            </div>
                     </div>
                     <div>
                        <Button title={"Submit"} width={"105px"} height={"28px"} color={"white"} backgroundColor={"#6149D8"} onClick={()=>{
                              submit();
                        }} />
                     </div>

               </div>

               <Loarder  visible={isLoading} />
               <Toaster/>

           </div>
      )
}
