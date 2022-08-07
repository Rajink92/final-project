import React, { useState, useEffect } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

import { api_base } from 'config'
import BasicModal from './ModalAddCategory';
import CategorySelect from './CategorySelect';

const Used = ({used, setUsed}) => {
	// let {id} = useParams();
    return (
			<div>
			  <FormControlLabel
          value="start"
          control={
					<Switch
						checked={used}
						onChange={async() => setUsed(prev => prev ? false : true)}
						inputProps={{ 'aria-label': 'controlled' }}
					/>}
          label='Use In Exam'
          labelPlacement="start"
        />
			</div>
    );
};

export default Used;