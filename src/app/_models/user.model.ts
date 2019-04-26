
export class User {
    id: number;
    email: string;
    password: string;
    fname: string;
    lname: string;


	  constructor(userInfo:any) {
	    this.fname = userInfo.fname;
	    this.lname = userInfo.lname;
	    this.email = userInfo.email;
	    this.password = userInfo.password;
	  }

	  validate(){
	    let can_submit = false;
	    let errors = []

	        let validate_hash = { fname: { 
                           required: true,
                           pattern: /^[A-Za-z]+$/

                           },
                           lname: { 
                           required: true,
                           pattern: /^[A-Za-z]+$/
                           } ,
                           email: { 
                           required: true,
                           pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

                           },
                           password: { 
                           required: true,
                           min: 8
                           }
                };
			let message_hash = { 
			            fname: { 
			               required: '*First name is required',
			               pattern: 'Please enter valid first name'
			            },
			            lname: { 
			               required: '*Last name is required',
			               pattern: 'Please enter valid last name'
                           },
			            email: { 
			               required: '*Email is required',
			               pattern: 'Please enter valid email'
                           },
			            password: { 
			               required: '*Password is required',
			               min: 'Please enter minimum length 8'
                           }
			    };


         for (let field in validate_hash) {
	        for(let key in validate_hash[field]){
	            if(!errors.some(e => e.field === field)){
		            let response;
		            switch(key) { 
					   case "required": { 
	                      response = this.validate_presence(validate_hash[field][key], field, message_hash[field][key]);
	                      if(response)
	                      {
	                        errors.push(response);
	                      }
					      break; 
					   }  
					   case "pattern": { 
					      response = this.validate_pattern(validate_hash[field][key], field, message_hash[field][key]);
	                      if(response)
	                      {
	                        errors.push(response);
	                      }
					      break; 
					   }  
					   case "min": { 
					      response = this.validate_minlength(validate_hash[field][key], field, message_hash[field][key]);
	                      if(response)
	                      {
	                        errors.push(response);
	                      }
					      break; 
					   } 
					   default: { 
					      console.log("Invalid choice"); 
					      break;              
					   } 
					} 
				}
	        }
		}
		return errors;
	  }
   
      validate_presence(type, value, message){

        if(type) {
           if(this[value] == null || this[value] == undefined){
                let field_error = {};
		        field_error['field'] = value;
		        field_error['message'] = message;
		        return field_error;
           }
           else{
             return false;
           }
        }
        else{
             return false;
           }

      }

       validate_pattern(pattern, value, message){
        if(!pattern.test(this[value])) {
            let field_error = {};
	        field_error['field'] = value;
	        field_error['message'] = message;
	        return field_error;
        }
        else{
             return false;
           }

      }

      validate_minlength(ninlength, value, message){
         if(this[value].length < ninlength) {
            let field_error = {};
	        field_error['field'] = value;
	        field_error['message'] = message;
	        return field_error;
        }
        else{
             return false;
           }
      }



	  save() {
	    console.log(this.fname, this.lname, this.email, this.password);
	    console.log("success");
	  }
	}