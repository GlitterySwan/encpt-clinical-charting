import React, { useState } from 'react';

// Standardized eNCPT Terminology Dictionaries
const ENCPT_DICTIONARY = {
  problems: [
    "NI-1.2 Inadequate energy intake",
    "NI-2.1 Inadequate oral intake",
    "NI-5.1 Unintended weight loss",
    "NC-2.2 Altered nutrition-related laboratory values"
  ],
  etiologies: [
    "decreased appetite secondary to acute medical treatment",
    "increased nutrient requirements due to metabolic stress",
    "limited physical ability to prepare meals",
    "lack of prior knowledge regarding dietary needs"
  ],
  interventions: [
    "ND-1.1 Meals and Snacks (High-Calorie / High-Protein)",
    "E-1.1 Initial/Brief Nutrition Education",
    "C-2.3 Self-Monitoring Counseling",
    "RC-1.1 Coordination of Care with Medical Team"
  ],
  monitoring: [
    "FH-1.1.1 Total Energy Intake (3-day food record)",
    "AD-1.1.2 Body Weight & BMI trajectory",
    "BD-1.1.1 Laboratory Values (Serum Albumin/Glucose)"
  ]
};

export default function App() {
  const [patientId, setPatientId] = useState('PT-90481');
  const [assessmentText, setAssessmentText] = useState('Patient reports severe nausea post-treatment with unintentional weight loss.');

  // PES Statement Builder State
  const [problem, setProblem] = useState(ENCPT_DICTIONARY.problems[0]);
  const [etiology, setEtiology] = useState(ENCPT_DICTIONARY.etiologies[0]);
  const [signs, setSigns] = useState('8.5% weight loss over 30 days and caloric intake <50% target.');

  // Intervention & Monitoring State
  const [intervention, setIntervention] = useState(ENCPT_DICTIONARY.interventions[0]);
  const [monitoring, setMonitoring] = useState(ENCPT_DICTIONARY.monitoring[0]);

  // Export State
  const [exportedJson, setExportedJson] = useState(null);

  // Formatted PES Statement
  const pesStatement = `${problem} related to ${etiology} as evidenced by ${signs}`;

  const handleExport = () => {
    const encptNote = {
      patientId,
      timestamp: new Date().toISOString(),
      eNCPT: {
        step1_Assessment: assessmentText,
        step2_Diagnosis: pesStatement,
        step3_Intervention: intervention,
        step4_MonitoringEvaluation: monitoring
      }
    };

    setExportedJson(JSON.stringify(encptNote, null, 2));
  };

  return (
    <div style={{ maxWidth: '750px', margin: '20px auto', fontFamily: 'Arial, sans-serif', padding: '24px', backgroundColor: '#fff', border: '1px solid #cbd5e0', borderRadius: '8px' }}>
      <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', marginTop: 0 }}>
        Healthcare Provider eNCPT Clinical Charting Module
      </h2>

      <div style={{ marginBottom: '16px' }}>
        <label><strong>Patient ID / MRN: </strong></label>
        <input 
          type="text" 
          value={patientId} 
          onChange={(e) => setPatientId(e.target.value)} 
          style={{ padding: '6px', marginLeft: '8px', borderRadius: '4px', border: '1px solid #ccc' }} 
        />
      </div>

      {/* Step 1: Assessment */}
      <div style={{ marginBottom: '20px', border: '1px solid #e2e8f0', padding: '14px', borderRadius: '6px', backgroundColor: '#f8fafc' }}>
        <h4 style={{ margin: '0 0 8px 0', color: '#2b6cb0' }}>Step 1: Nutrition Assessment</h4>
        <textarea 
          value={assessmentText} 
          onChange={(e) => setAssessmentText(e.target.value)} 
          rows={3} 
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #cbd5e0' }}
        />
      </div>

      {/* Step 2: Diagnosis (PES Builder) */}
      <div style={{ marginBottom: '20px', border: '1px solid #e2e8f0', padding: '14px', borderRadius: '6px', backgroundColor: '#f8fafc' }}>
        <h4 style={{ margin: '0 0 12px 0', color: '#2b6cb0' }}>Step 2: Nutrition Diagnosis (PES Statement Builder)</h4>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Problem (P):</label>
            <select value={problem} onChange={(e) => setProblem(e.target.value)} style={{ width: '100%', padding: '6px', marginTop: '2px' }}>
              {ENCPT_DICTIONARY.problems.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Etiology (E) [related to]:</label>
            <select value={etiology} onChange={(e) => setEtiology(e.target.value)} style={{ width: '100%', padding: '6px', marginTop: '2px' }}>
              {ENCPT_DICTIONARY.etiologies.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Signs & Symptoms (S) [as evidenced by]:</label>
            <input 
              type="text" 
              value={signs} 
              onChange={(e) => setSigns(e.target.value)} 
              style={{ width: '100%', padding: '6px', marginTop: '2px', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ backgroundColor: '#edf2f7', padding: '10px', borderRadius: '4px', marginTop: '6px' }}>
            <span style={{ fontSize: '12px', color: '#4a5568', fontWeight: 'bold' }}>GENERATED PES STATEMENT:</span>
            <p style={{ margin: '4px 0 0 0', fontStyle: 'italic', color: '#1a202c' }}>{pesStatement}</p>
          </div>
        </div>
      </div>

      {/* Step 3: Intervention */}
      <div style={{ marginBottom: '20px', border: '1px solid #e2e8f0', padding: '14px', borderRadius: '6px', backgroundColor: '#f8fafc' }}>
        <h4 style={{ margin: '0 0 8px 0', color: '#2b6cb0' }}>Step 3: Nutrition Intervention</h4>
        <select value={intervention} onChange={(e) => setIntervention(e.target.value)} style={{ width: '100%', padding: '6px' }}>
          {ENCPT_DICTIONARY.interventions.map(i => <option key={i} value={i}>{i}</option>)}
        </select>
      </div>

      {/* Step 4: Monitoring & Evaluation */}
      <div style={{ marginBottom: '20px', border: '1px solid #e2e8f0', padding: '14px', borderRadius: '6px', backgroundColor: '#f8fafc' }}>
        <h4 style={{ margin: '0 0 8px 0', color: '#2b6cb0' }}>Step 4: Monitoring & Evaluation</h4>
        <select value={monitoring} onChange={(e) => setMonitoring(e.target.value)} style={{ width: '100%', padding: '6px' }}>
          {ENCPT_DICTIONARY.monitoring.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      <button 
        onClick={handleExport} 
        style={{ width: '100%', padding: '12px', backgroundColor: '#27ae60', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '15px', fontWeight: 'bold' }}
      >
        Generate Standardized Clinical Note
      </button>

      {exportedJson && (
        <div style={{ marginTop: '20px' }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#2d3748' }}>Generated JSON Note Output:</h4>
          <pre style={{ backgroundColor: '#1a202c', color: '#68d391', padding: '12px', borderRadius: '6px', overflowX: 'auto', fontSize: '13px' }}>
            {exportedJson}
          </pre>
        </div>
      )}
    </div>
  );
}