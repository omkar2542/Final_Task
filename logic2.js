const emp = []; // stores employee data
const deleted = []; // stores deleted ids
 

//adding action listener to the on form submission
const empData = document.getElementById("emp_data");
empData.addEventListener("submit", function submit(event) {
    event.preventDefault();


//gettign each element form 
    const emp1_id = document.getElementById("id");
    const emp1_name = document.getElementById("name");
    const emp1_age = document.getElementById("age");
    const emp1_gender = document.getElementById("gender");

//getting actual values for form 
    const emp_id = emp1_id.value;
    const emp_name = emp1_name.value;
    const emp_age = emp1_age.value;
    const emp_gender = emp1_gender.value;



// making object to store all data 
    const data = {
        "emp_id": emp_id,
        "emp_name": emp_name,
        "emp_age": emp_age,
        "emp_gender": emp_gender
    };
// calling insert data funcation
    insertdata(data, "add");
//making all value  null after adding the record 
    emp1_id.value='';
    emp1_name.value='';
    emp1_age.value='';
    emp1_gender.value='male';
});


function insertdata(data, op) {
    let already = false;
    already = deleted.includes(data.emp_id);
    for (let i = 0; i < emp.length; i++) {
        if (emp[i].emp_id == data.emp_id) {
            already = true;
            document.getElementById('eror').innerHTML = 'this ID has already been used';
        }
       // console.log(emp[i], data);
    }

    if (already) {
        
        if (op == "add") {
            return false;
        } else {
            return true;
        } 
        
    
    }
    
    document.getElementById('eror').innerHTML = '';

    emp.push(data);

  //  console.log(data);
    
    const t = document.getElementById("table1");
    const newRow = t.insertRow();
    newRow.setAttribute('id', data.emp_id);

    const eid = newRow.insertCell();
    const ename = newRow.insertCell();
    const eage = newRow.insertCell();
    const egender = newRow.insertCell();
    const eaction = newRow.insertCell();

    eid.textContent = data.emp_id;
    ename.textContent = data.emp_name;
    eage.textContent = data.emp_age;
    egender.textContent = data.emp_gender;

    const e_edit = document.createElement('button');
    e_edit.textContent = 'Edit';
    e_edit.addEventListener('click', function () {
        edit_emp(data.emp_id, data);
    });

    const e_delete = document.createElement('button');
    e_delete.textContent = 'Delete';
    e_delete.addEventListener('click', function () {
        delete_emp(data.emp_id, data, "delete");
    })

    eaction.appendChild(e_edit);
    eaction.appendChild(e_delete);
}

    function edit_emp(emp_id1, data1) {
    
    document.getElementById('upper').style.display = 'block';

    document.getElementById('upid').value = data1.emp_id;
    document.getElementById('upname').value = data1.emp_name;
    document.getElementById('upage').value = data1.emp_age;
    document.getElementById('upgender').value = data1.emp_gender;

    document.getElementById('submit2form').addEventListener("submit", function submit1(event) {
        event.preventDefault();

        const emp_id = document.getElementById("upid").value;
        const emp_name = document.getElementById("upname").value;
        const emp_age = document.getElementById("upage").value;
        const emp_gender = document.getElementById("upgender").value;

        const data = {
            "emp_id": emp_id,
            "emp_name": emp_name,
            "emp_age": emp_age,
            "emp_gender": emp_gender
        };
        

        /*
        var already=false;
        for (let i = 0; i < emp.length; i++) {
            if (emp[i].emp_id == data.emp_id) {
                already = true;
                document.getElementById('te').innerHTML = 'This ID has already been used';
                return;
            }
            else{
                
            }
            
        }
        */

        if(deleted.includes(data.emp_id)){
        document.getElementById('te').innerHTML='This ID has already been used';
        return;
        }

        // console.log(data);
        delete_emp(emp_id1, data1, "edit");
        
        if (insertdata(data, "edit") == true) {
            insertdata(data1);
        } 
        document.getElementById('upper').style.display = 'none';
        document.getElementById('te').innerHTML='';
        
       
    });

    document.getElementById('submit3').addEventListener('click',function cancel(){
        document.getElementById('upper').style.display = 'none';
    })

}


function delete_emp(emp_id, data, op) {
    if (op == "delete") {
        deleted.push(emp_id);
    }
    emp.splice(emp.indexOf(data), 1);
    document.getElementById(emp_id).remove();
}