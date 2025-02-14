# Project Documentation

This document provides step-by-step instructions for accessing the MongoDB database, uploading data to the VM, and updating metadata for new files.

---

## Steps Overview

### 1. Connect to the University VPN
Before proceeding, ensure you are connected to the university's VPN.

---

### 2. Set Up an SSH Tunnel for Database Access
To access the MongoDB instance from **MongoDB Compass**, you need to set up an SSH tunnel.

Use the following command from your terminal:

```bash
ssh -L 27017:localhost:27017 username@<VM_IP_ADDRESS>
```
- Replace `username` with your SSH username.
- Replace `<VM_IP_ADDRESS>` with the IP address of the VM.

This command will forward traffic from your local machine's port `27017` to the MongoDB instance on the VM's `localhost:27017`.

---

### 3. Check if MongoDB is Running on the VM
After logging into the VM via SSH, check if MongoDB is running with the following command:

```bash
sudo systemctl status mongod
```
- If the status shows **active (running)**, you can proceed.
- If MongoDB is not running, continue to the next step to restart it.

---

### 4. (OPTIONAL) Restart MongoDB if it is not running correctly
If MongoDB is not running, restart it using the following commands:

```bash
sudo systemctl restart mongod
sudo systemctl status mongod
```
- If it still fails to start, contact the project administrator.

---

### 5. Connect to MongoDB from Compass
Once the SSH tunnel is active and MongoDB is running, you can connect to the database using MongoDB Compass Application.

Use the following connection string in Compass:

```mongodb
mongodb://localhost:27017
```
You can now view and interact with the collections in the database.

---

### 6. Upload New Data to the VM
New uncleaned data can be uploaded to the VM's `uncleaned` directory using one of the methods below:

#### Option 1: Upload Using File Transfer Applications (e.g., FileZilla)
1. Open **FileZilla** or any SFTP client.
2. Connect to the VM using your SSH credentials.
3. Navigate to the following directory on the VM:

```text
/home/faraz/external_disk/Capstone/data/uncleaned
```
4. Upload your CSV files to the `uncleaned` folder.

#### Option 2: Upload Using SCP (via Windows Command Line)
You can also upload files directly via SSH using the `scp` command:

```bash
scp /path/to/local/file.csv username@<VM_IP_ADDRESS>:/home/faraz/external_disk/Capstone/data/uncleaned/
```
- Replace `/path/to/local/file.csv` with the path to your local file.
- Replace `username` and `<VM_IP_ADDRESS>` with your credentials and VM information.

---

### 7. Run the Metadata Update Script on the VM
To update the metadata for new files in the `uncleaned` directory, follow these steps:

1. SSH into the VM.
2. Navigate to the script's directory:

```bash
cd /home/faraz/external_disk/Capstone/meta_data_script/
```
3. Run the metadata update script:

```bash
python3 meta_script.py
```

Alternatively, you can run the script from your home directory:

```bash
python3 ~/meta_script.py
```

This will scan the `uncleaned` & `raw` directories, update the database with metadata for new files, and skip any files that have already been processed.

---

# (If you're not using "MongoDB Compass" - `Mongosh` commands to view or access the db through command line:

https://www.mongodb.com/docs/mongodb-shell/run-commands/

Check the link or use ChatGPT for `Mongosh` commands that you can use in the command line to access & view the database instead of using "MongoDB Compass"

## (Optional Step) In case of the loss of the `meta_data_script` folder on the VM

### 8. Create a .env File for Configuration
Create a `.env` file to store your configuration details. This file should contain the following entries:

```env
MONGO_URI=mongodb://localhost:27017/capstoneDB
VM_IP= #Replace with the IP of the machine that has the files
VM_USERNAME=  # Replace with your actual username
VM_PASSWORD=  # Replace with your actual password
RAW_DIR= #Replace with the DIR of your cleaned files
UNCLEANED_DIR= #Replace with the DIR of your uncleaned files
```
Ensure this file is placed in the root directory of your project and is not publicly accessible.

---

