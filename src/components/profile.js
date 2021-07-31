import React from "react";
import {Checkbox, Divider, FormControl, FormControlLabel, FormGroup, Paper, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {changeName, changeStatus} from "../redux/profile/profile-actions";
import TextField from "@material-ui/core/TextField";

export default function Profile() {
    const dispath = useDispatch()
    const {name, status_hungry} = useSelector(state => state.profile)

    const handleHungryChange = (event) => {
        dispath(changeStatus(event.target.checked))
    }

    const handleNameChange = (event) => {
        dispath(changeName(event.target.value))
    }

    return (
        <Paper>
            <Typography variant="h2">
                Профиль
            </Typography>

            <Link to='/'>На главную</Link>
            <Divider/>

            <FormGroup>
                <FormControl>
                    <TextField label="Имя"
                               variant="outlined"
                               value={name}
                               onChange={handleNameChange}
                               autoFocus
                               required
                    />
                </FormControl>

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={status_hungry}
                            onChange={handleHungryChange}
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Голодный?"
                />
            </FormGroup>
        </Paper>
    )
}
