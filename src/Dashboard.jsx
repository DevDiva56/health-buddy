import { useState, useEffect } from "react"
import "./Dashboard.css"





function Dashboard() {
    const[medication, setMedication]=useState ([])
    const[todayMeds, setTodaysMeds] = useState([])

    // Load data
    useEffect(()=>{
        const saved = localStorage.getItem("medications")
        if (saved){
            const meds =JSON.parse(saved)
            setMedication(meds)

            //Filter meds for today
            const today = new Date().toISOString().slice(0,10)
            const filterToday=meds.filter(m=>{
                return m.time && m.time.slice(0,5)>="00.00"
            })
            setTodaysMeds(filterToday)
        } 
    }, [])

    return(
        <div className="dashboard">
            <h2>Welcome Back</h2>
            <p>Your health summary for today.</p>

            {/* Summary Cards */}
            <div className="summary-grid">
                <div className="summary-card">
                    <h3>{medication.length}</h3>
                    <p>Total Medication</p>
                </div>
            <div className="summary-card">
                <h3>{todayMeds.length}</h3>
                <p>Medications Today</p>
            </div>
            <div className="summary-card">
                <h3>0</h3>
                <p>Upcoming Appointments</p>
            </div>
            </div>

            {/* Today's Medication */}
            <h3 className="section-title">Today's Medication</h3>
            {todayMeds.length===0?(
                <p>No medications scheduled today.</p>

            ):(<div className="today-list">
                {todayMeds.map((med, index)=>{
                    <div className="today-card" key={index}>
                        <h4>{med.name}</h4>
                         <p><strong>Dose:</strong> {med.dose}</p>
                         <p><strong>Time:</strong> {med.time}</p>
                         <p><strong>Schedule:</strong> {med.schedule}</p> 
                    </div>
                })}


            </div>
        )}

         {/* Quick Links */}
      <h3 className="section-title">Quick Links</h3>
      <div className="quick-links">
        <button onClick={() => window.location.href = "/medication"}>View All Medications</button>
        <button onClick={() => window.location.href = "/medication#add"}>Add Medication</button>
        <button>Conditions</button>
        <button>Appointments</button>
      </div>

        </div>
    )
    
}



export default Dashboard