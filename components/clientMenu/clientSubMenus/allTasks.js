import { getEmployeesForClient } from '@/service/common/getAllRegisteredEmployees';
import Image from 'next/image';
import React, {useState,useEffect} from 'react'

const status = [
     "Mark As Read",
     "Mark As Read",
     "Mark As Read",
]

export default function AllTasks() {
      const[allEmployees,setAllEmployees] = useState([]);
      const[category,setCategorys] = useState([]);
      const[name,setNames] = useState([]);
      const[selectedRole,setSelectedRole] = useState();
      const[dropDownStatus,setDropDownButtonStatus] = useState(false);
      const[selectedStatus,setSelectedStatus] = useState('');


    useEffect(()=>{
    
        getEmployeesForClient().then((data)=>{
                const{allEmployees,onlyCatogaries,onlyEmployees} = data ;
       
                    setAllEmployees(allEmployees)
                    setCategorys(onlyCatogaries);
                    setNames(onlyEmployees);

        }).catch((err)=>{
             console.log(err);
        })
       
     },[])


     function statusColor(status){
         switch(status){
            case "Pending" : return "#F89028";
            case "Accept"  : return  "#34F547";
            case "Cancel"  : return  "#F42725";
            default : return "#5037D0"
         }
     }

    return(

      <div style={{border:'2px solid red' , width:'100%',height:'100%'}}>

                <div style={{border:'2px solid red' , width:'100%',height:"50px",marginTop:'10px'}}>
                        
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <select className='box-shadow-type-one' style={{borderRadius:'10px',width:  '15%',paddingLeft:'10px',height:"40px",margin:'10px'}} onChange={(e)=>{ setSelectedRole(e.target.value)}} >
                                <option style={{fontSize:'12px' , width:'20%' , paddingLeft:'20px'}} selected>All</option>
                                { 
                                     category.map((item, index) => (
                                         <option style={{fontSize:'12px' , width:'100%' , paddingLeft:'20px'}} value={item}  key={index}>{item}</option>
                                     ))      
                                }  
                            </select>
                        </div> 
                </div>
                <div style={{border:'2px solid red' , width:'100%',height:"90%",marginTop:'10px',display:'flex',flexDirection:'row'}}>
                       <div style={{border:'2px solid red' , width:'50%',height:"100%",marginTop:'10px',display:'flex',flexDirection:'row'}}>
                             
                             <div className='box-shadow-type-two' style={{border:'2px solid red' , width:'50%',height:"90px",marginTop:'10px',display:'flex',flexDirection:'column',borderRadius:'10px',cursor:'pointer'}}>
                                      <div style={{ width:'100%',height:"30px",marginTop:'10px',display:'flex',flexDirection:'column',paddingLeft:'20px'}}>
                                             <label style={{fontSize:'20px',fontWeight:'500'}}>Title</label>   
                                      </div>
                                      <div style={{width:'100%',height:"30px",marginTop:'10px',display:'flex',flexDirection:'row',justifyContent:"space-between",alignItems:'center'}}>
                                           <label style={{marginLeft:'20px'}}>description</label>
                                           <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',columnGap:'10px',marginRight:'10px'}}>
                                              <label>status</label>
                                              <div style={{width:'10px',height:'10px',borderRadius:"100%",backgroundColor:"#5037D0"}}/>
                                           </div>
                                      </div>
                             </div>

                       </div>

                       <div style={{border:'2px solid red' , width:'50%',height:"100%",marginTop:'10px',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                        <div style={{border:'2px solid red',width:'80%',height:'80%',display:'flex',flexDirection:'column'}}>
                                                 <div style={{height:'50px'}}>

                                                 </div>
                                                 <div style={{height:'80%'}}>


                                                 </div>
                                                <div style={{display:'flex',flexDirection:'column',alignSelf:'flex-end',position:'relative'}}>                 
                                                                <div style={{width:'150px',height:'40px',display:'flex',borderRadius:'10px',margin:"10px"}}>
                                                                        <div style={{backgroundColor:'#5037D0',width:'80%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',borderRightColor:'2px solid #FFFFFF',borderTopLeftRadius:'10px',borderBottomLeftRadius:'10px',cursor:'pointer'}} onClick={()=>{console.log("SSSSS");}}>
                                                                                    <label style={{fontSize:'12px',fontWeight:'500',color:'white'}}>{selectedStatus}</label>
                                                                        </div>
                                                                        <div style={{width:'20%',height:'100%',backgroundColor:'#6149D8',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',borderTopRightRadius:'10px',borderBottomRightRadius:'10px'}} onClick={()=>{setDropDownButtonStatus(prev=>!prev)}}>
                                                                            <Image src={"/images/common/arrowDown.png"} width={20} height={20}/>
                                                                        </div>
                                                    
                                                                </div>
                                                                    {
                                                                        dropDownStatus ?   
                                                                            <div style={{width:'200px',display:'flex',flexDirection:'column',backgroundColor:'#CCC4F0',position:'absolute',bottom:'0'}}>
                                                                                {
                                                                                    status.map((data,index)=>{
                                                                                
                                                                                        return(
                                                                                            <div style={{border:'2px solid white',height:"20px",display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}} onClick={()=>{ setSelectedStatus(data)  ;setDropDownButtonStatus(prev=>!prev)}}> 
                                                                                                <label>{data}</label>           
                                                                                            </div>
                                                                                        )
                                                                                    })
                                                                                }


                                                                            </div>
                                                                        : ""
                                                                    }
   
        
                                                 </div> 
                                                 

                                         </div>
                          

                       </div>


                </div>



      </div>
    )
 
}