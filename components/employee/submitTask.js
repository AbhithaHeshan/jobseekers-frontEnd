import React from 'react'
import TextField from "@/components/textField";
import {TEXT} from "@/util/regXConstents";

export default function SubmitTask() {

    return(
        <div style={{width:"inherit",height:'inherit'}}>
             <div style={{display:'flex',flexDirection:'column'}}>
                 <TextField width={"200px"} height={"40px"} placeholder={"BusinessName"} borderRadius={"10px"} borderColor={"red"}  warnText={TEXT} value={"d"}/>
             </div>

        </div>
    );


}
