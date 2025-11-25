import { useState, useEffect } from "react"
import { ToastContainer, toast } from "react-toastify"
import"react-toastify/dist/ReactToastify.css"
import"./Medication.css"

//Add Modal
function Medication() {
    const [medName, setMedName] = useState("")
    const[medDose, setMedDose] =useState("")
    const[medTime, setMedTime] = useState("")
    const[medSch, setMedSch] = useState("")

    // Edit Modal
    const [editName, setEditName] = useState("");
    const [editDose, setEditDose] = useState("");
    const [editTime, setEditTime] = useState("");
      const [editSch, setEditSch] = useState("");


    const[medication, setMedication] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    const[isEditing, setIsEditing] =useState(false)
    const[editIndex, setEditIndex] = useState(null)


   //Loading Modal
    useEffect(()=>{
    const saved =localStorage.getItem("medications");
    if(saved){
        setMedication(JSON.parse(saved))
          setIsLoaded(true)
    }
  
},[])


//Storage Modal
    useEffect(()=>{
        if(isLoaded){
        
        localStorage.setItem("medications",JSON.stringify(medication))
        }
},
    [medication, isLoaded])


//DELETE Medication

 const handleDelete=(index)=>{
     const confirmDelete = window.confirm("🗑️ Are you sure you want to delete this medication?");
  if (!confirmDelete) return;

        setMedication((prev)=>
            prev.filter((_, i)=> i!==index)

    );
     toast.error("❌ Medication deleted.");
    }

    //Open Edit Modal
    const handleEdit =(index)=>{
        const med = medication[index];
        setEditName(med.name);
        setEditDose(med.dose);
         setEditTime(med.time);
         setEditSch(med.schedule);

         setEditIndex(index)
        setIsEditing(true)
    }


    //Update Modal

    const handleUpdateMedication =(e)=>{
        e.preventDefault()

         const updatedMed = {
      name: editName,
      dose: editDose,
      time: editTime,
      schedule: editSch,
    }

      const updatedList = [...medication];
    updatedList[editIndex] = updatedMed;

    setMedication(updatedList);
    setIsEditing(false);
    setEditIndex(null);

    toast.success("Medication updated successfully!");
  }

  // ADD NEW medication
  const handleAddMedication = (e) => {
    e.preventDefault();

    if (!medName || !medDose || !medTime || !medSch) {
      toast.warning("Please fill all fields!");
      return;
    }

    const newMed = {
      name: medName,
      dose: medDose,
      time: medTime,
      schedule: medSch,
    };

    setMedication([...medication, newMed]);

    toast.success("Medication added!");

    // clear form
    setMedName("");
    setMedDose("");
    setMedTime("");
    setMedSch("");
  }
   



    return(
        <div className= "medicine-container"> 
        {isEditing&&(
            <div className="modal-overlay">
                <div className="modal-content">
                    <h3>Edit Medicine</h3>
                     <form onSubmit={handleUpdateMedication}>
                        <div>
                            <label>Medication Name:</label>
                            <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label>Dosage:</label>
                            <input
                                type="text"
                                value={editDose}
                                onChange={(e) => setEditDose(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Schedule:</label>
                            <input
                                type="text"
                                value={editSch}
                                onChange={(e) => setEditSch(e.target.value)}
                            />
                        </div>

                        <div>
                            <label>Time:</label>
                            <input
                                type="time"
                                value={editTime}
                                onChange={(e) => setEditTime(e.target.value)}
                            />
                        </div>

                        <button className="update-med" type="submit">Update Medication</button>
                        <button className="cancel-btn" type="button" onClick={() => setIsEditing(false)}>
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        )}

        {/* MAIN PAGE */}
            <h2>Medication Page</h2>
            <p className="para">Here you’ll add and view medications.</p>
            <form onSubmit={handleAddMedication}>
                <div>
                    <label>Medication Name:</label>
                    <input type="text" value={medName} onChange={(e)=>setMedName(e.target.value)} placeholder="Enter medicine" />
                </div>
                <div>
                    <label>Dosage:</label>
                    <input type="text" value={medDose} onChange ={(e)=>setMedDose(e.target.value)} placeholder="Enter Dosage"/>
                </div>
               <div>
                    <label>Schedule:</label>
                    <input type="text" value={medSch} onChange ={(e)=>setMedSch(e.target.value)} placeholder="Enter Schedule"/>
                </div>
                <div>
                    <label>Time</label>
                    <input type="time" value={medTime} onChange={(e)=>setMedTime(e.target.value)}/>
                </div>
                <button type="submit">Add Medication</button>
            </form>

            {/* preview section */}
            <div className="preview">
                <h3>Preview</h3>
                <p><strong>Name:</strong>{medName}</p>
                <p><strong>Dosage:</strong>{medDose}</p>
                <p><strong>Schedule:</strong>{medSch}</p>
                <p><strong>Time:</strong>{medTime}</p>
            </div>

            
            <div className="medication-list">
                <h3>💊Saved Medication</h3>
                {
                    medication.length===0?(
                        <p>No Medication Added Yet</p>
                    ):(
                        <div className="med-cards">
                            {
                                medication.map((med,index)=>(
                                    <div className="med-card" key={index}>
                                        <h4>{med.name}</h4>
                                        <p><strong>Dosage:</strong>{med.dose}</p>
                                        <p><strong>Schedule:</strong>{med.schedule}</p>
                                        <p><strong>Time:</strong>{med.time}</p>

                                        {/* Edit Button */}
                                    <button className="edit-btn" onClick={()=>handleEdit(index)}>✎</button>
                                  

                                        {/* Delete Button */}
                                        <button className="delete-btn" onClick={()=>handleDelete(index)}>
                                        🚮
                                    </button>

                                    </div>  
                                      

                                ))
                            
                               
                            }

                             
                        </div>
                    )
                }
            </div>

            <ToastContainer
  position="bottom-right"
  theme="colored"
/>
        </div>
    )
}

export default Medication