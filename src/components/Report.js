import React from 'react';
import { useParams } from 'react-router-dom';   // use the useParams hook to get the id parameter from the URL
import useFetch from './useFetch';
//install npm install html2pdf.js run it in the root of the project but not the project
import html2pdf from 'html2pdf.js';


function Report() {
    const { id } = useParams(); // Get the ID from the URL
    const { data: reportData, loading, error } = useFetch(`http://localhost:8000/payments/${id}`);

    const handleDownloadPDF = () => {
        const content = document.getElementById('report-content');
    
        const opt = {
          margin: 10,
          filename: 'report.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        };
    
        html2pdf().from(content).set(opt).save();
      };
    

    return (
        <div>
       {/* {loading ? (
                <p>Loading report details...</p>
            ) : error ? (
                <p>Error fetching report details.</p>
            ) : (
                
                <div>
                    <h2>Report Details</h2>
                    <p>ID: {reportData.id}</p>
                    <p>Name: {reportData.name}</p>
                    <p>Amount: {reportData.amount}</p>

                   
                </div>
            )}
             */} 
             {reportData && 
    <>
        {reportData.map(payment => {
            return(
                <div className='report' id='report-content'>
                    <h2>Report Details</h2>
                <p>ID: {payment.id}</p>
                <p>Name: {payment.name}</p>
                <p>Amount: {payment.amount}</p>
                <p>Student-ID: {payment.student_id}</p>
                <p>Date: {payment.date}</p>
                <button onClick={handleDownloadPDF}>Download PDF</button>

                </div>
                
            )
        })}
    </>
}

        </div>



    );
}

export default Report;
