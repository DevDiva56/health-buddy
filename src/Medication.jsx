import { useState, useEffect } from "react"
import { ToastContainer } from "react-toastify"
import"react-toastify/dist/ReactToastify.css"
import"./Medication.css"

function Medication() {
    const [medName, setMedName] = useState('')
    const[medDose, setMedDose] =useState('')
    const[medTime, setMedTime] = useState('')
    const[medSch, setMedSch] = useState('')

    // Edit Modal
    const [editName, setEditName] = useState("");
    const [editDose, setEditDose] = useState("");
    const [editTime, setEditTime] = useState("");
      const [editSch, setEditSch] = useState("");


    const[medication, setMedication] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const[isEditing, setIsEditing] =useState(false)
    const[editIndex, setEditIndex] = useState(null)

    useEffect(()=>{
    const savedMeds =localStorage.getItem("medications");
    if(savedMeds){
        setMedication(JSON.parse(savedMeds))
    }
    setIsLoaded(true)
},[])


    useEffect(()=>{
        if(isLoaded){
        
        localStorage.setItem("medications",JSON.stringify(medication))
        }
},
[medication, isLoaded])



 const handleDelete=(indexToDelete)=>{
     const confirmDelete = window.confirm("🗑️ Are you sure you want to delete this medication?");
  if (!confirmDelete) return;
        setMedication((prevMeds)=>
            prevMeds.filter((_, index)=> index!==indexToDelete)

    );
     toast.error("❌ Medication deleted.");
    }

    const handleEdit =(indexToEdit)=>{
        // console.log("Editing med at index", indexToEdit);
        const medToEdit = medication[indexToEdit];
        setMedName(medToEdit.name)
        setMedDose(medToEdit.dose)
         setMedSch(medToEdit.schedule)
        setMedTime(medToEdit.time)
         setEditIndex(indexToEdit)
        setIsEditing(true)
    }



    const handleAddMedication =(e)=>{
        e.preventDefault()

        if(!medName||!medDose|| !medSch||!medTime){
            toast.warning ("⚠️ Please fill in all fields before saving your medication.");
    return;
  }

        const newMed = {
            name: medName,
            dose: medDose,
            schedule: medSch,
            time: medTime

        } 


        if(isEditing){
            const updateMeds =[...medication]
            updateMeds[editIndex] =newMed;
            setMedication(updateMeds)
            setIsEditing(false)
            setEditIndex(null)
            setShowModal(false);
            toast.success("✅ Medication updated successfully!");
        } else{
              setMedication([...medication, newMed])
     toast.success("💊 Medication added successfully!");
        }
        setMedName("")
    setMedDose("")
    setMedSch("")
    setMedTime("")
    }



    return(
        <div className= "medicine-container"> 
        {isEditing&&(
            <div className="modal-overlay">
                <div className="modal-content">
                    <h3>Edit Medicine</h3>
                     <form onSubmit={handleAddMedication}>
                        <div>
                            <label>Medication Name:</label>
                            <input
                                type="text"
                                value={medName}
                                onChange={(e) => setMedName(e.target.value)}
                                placeholder="Enter medicine"
                            />
                        </div>
                        <div>
                            <label>Dosage:</label>
                            <input
                                type="text"
                                value={medDose}
                                onChange={(e) => setMedDose(e.target.value)}
                                placeholder="Enter Dosage"
                            />
                        </div>
                        <div>
                            <label>Schedule:</label>
                            <input
                                type="text"
                                value={medSch}
                                onChange={(e) => setMedSch(e.target.value)}
                                placeholder="Enter Schedule"
                            />
                        </div>
                        <div>
                            <label>Time:</label>
                            <input
                                type="time"
                                value={medTime}
                                onChange={(e) => setMedTime(e.target.value)}
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
                <button type="submit">{isEditing?"Update Medication": "Add Medication"}</button>
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
                                    <div key={index} className="med-card" >
                                        <h4>{med.name}</h4>
                                        <p><strong>Dosage:</strong>{med.dose}</p>
                                        <p><strong>Schedule:</strong>{med.schedule}</p>
                                        <p><strong>Time:</strong>{med.time}</p>

                                        {/* Delete Button */}
                                        <button className="delete-btn" onClick={()=>handleDelete(index)}>
                                        🚮
                                    </button>

                                    {/* Edit Button */}
                                    <button className="edit-btn" onClick={()=>handleEdit(index)}>✎</button>
                                    </div>
                                      

                                ))
                            
                               
                            }

                             
                        </div>
                    )
                }
            
                {/* <h3> 💊 Medication List</h3>
                <ul>
                    {medication.map((med, index)=>(
                        <li key={index}>
                            {med.name}-{med.dose}-{med.schedule}-{med.time}

                        </li>
                    ))}
                </ul> */}
            </div>
            <ToastContainer
  position="bottom-right"
  autoClose={2500}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="colored"
/>
        </div>
    )
}

export default Medication