import React, { useState } from "react";

const Settings = () => {
  const [cameraName, setCameraName] = useState("");
  const [rtspUrl, setRtspUrl] = useState("");
  const [cameras, setCameras] = useState([]);

  const handleAddCamera = () => {
    if (!cameraName || !rtspUrl) {
      alert("Please fill all fields");
      return;
    }

    const newCamera = {
      id: Date.now(),
      name: cameraName,
      rtspUrl: rtspUrl,
    };

    setCameras([...cameras, newCamera]);

    // Reset fields
    setCameraName("");
    setRtspUrl("");
  };

  const handleCancel = () => {
    setCameraName("");
    setRtspUrl("");
  };

  return (
    <div style={styles.container}>
      <h2>Add New Camera</h2>
      <p>Connect an IP camera via RTSP</p>

      <div style={styles.formGroup}>
        <label>Camera Name</label>
        <input
          type="text"
          placeholder="4th Floor"
          value={cameraName}
          onChange={(e) => setCameraName(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label>RTSP URL</label>
        <input
          type="text"
          placeholder="rtsp://username:password@ip:port/stream"
          value={rtspUrl}
          onChange={(e) => setRtspUrl(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.buttonGroup}>
        <button onClick={handleAddCamera} style={styles.addBtn}>
          Add Camera
        </button>
        <button onClick={handleCancel} style={styles.cancelBtn}>
          Cancel
        </button>
      </div>

      <hr />

      <h3>Added Cameras</h3>
      {cameras.length === 0 ? (
        <p>No cameras added yet.</p>
      ) : (
        <ul>
          {cameras.map((cam) => (
            <li key={cam.id}>
              <strong>{cam.name}</strong> — {cam.rtspUrl}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "40px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontFamily: "Arial",
  },
  formGroup: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "8px",
    fontSize: "14px",
    marginTop: "5px",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
  },
  addBtn: {
    padding: "8px 16px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  cancelBtn: {
    padding: "8px 16px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

export default Settings;