import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Box,
  Typography,
} from '@mui/material';
export default function DropDownMenu({
  returnedValue,
  room,
}: {
  returnedValue: (value: string) => void;
  room: string;
}) {
  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;

    returnedValue(value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" sx={{ color: 'white' }}>
          Chat Rooms
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={!room.length ? '' : room}
          label="Chat Rooms"
          onChange={handleChange}
          color="secondary"
        >
          <MenuItem value={'Coding'}>
            <Typography>Coding</Typography>
          </MenuItem>
          <MenuItem value={'Just Chatting'}>
            <Typography>JustChat</Typography>
          </MenuItem>
          <MenuItem value={'Project ShowCase'}>
            <Typography>Project ShowCase</Typography>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
