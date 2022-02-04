import React from 'react';
import { FormControl,TextField,InputLabel,Select,MenuItem,ListItemText,Checkbox } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const formFileds = ({ formdata, change, id }) => {
    const showError = () => {
        let errorMessage = null;
        if(formdata.validation && !formdata.valid){
            errorMessage = formdata.validationMessage
        }
        return errorMessage;
    };
    const renderTemplate = () => {
        let formTemplate = null;
        switch(formdata.element){
            case("input"):
                formTemplate = (
                    <FormControl variant="outlined" fullWidth sx={{m:1}}>
                        <TextField
                            {...formdata.config}
                            value={formdata.value}
                            onBlur={ (event)=> change({ event, id, blur:true }) }
                            onChange={ (event)=> change({ event, id }) }
                            helperText = { showError() }
                        />
                    </FormControl>
                );
            break;
            case("select"):
                formTemplate = (
                    <FormControl variant="outlined" fullWidth sx={{m:1}}>
                        <InputLabel id={id}>{formdata.config.label}</InputLabel>
                        <Select
                            {...formdata.config}
                            value={formdata.value}
                            onBlur={ (event)=> change({ event, id, blur:true }) }
                            onChange={ (event)=> change({ event, id }) }
                        >
                            {
                                formdata.config.options.map(item => (
                                    <MenuItem
                                        key={item.key}
                                        value={item.key}
                                    >
                                        {item.value}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                ); 
            break;
            default:
                formTemplate = null;
        }
        return formTemplate;
    }
    return (
        <div>
            {renderTemplate()}
        </div>
    );
};

export default formFileds;