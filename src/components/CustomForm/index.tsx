import React, { ReactElement, useEffect, useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { Autocomplete, TextField, Select, MenuItem, FormControl, InputLabel, Box, CircularProgress, Button, IconButton, FormHelperText, Typography, Grid } from '@mui/material';
import { useDebouncedInputValues } from '../../utils/customHook'; // Import custom hook
import DeleteIcon from '@mui/icons-material/Delete';

interface OptionType {
  id: string;
  title: string;
  email: string;
}

interface Favorite {
  name: OptionType[];
  type: string;
}

const fetchRandomOptions = (term: string, selectedIds: string[]): Promise<OptionType[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const availableOptions = [
        { id: '1', title: 'Option 1', email: 'option1@example.com' },
        { id: '2', title: 'Option 2', email: 'option2@example.com' },
        { id: '3', title: 'Option 3', email: 'option3@example.com' },
        { id: '4', title: 'Option 4', email: 'option4@example.com' },
        { id: '5', title: 'Option 5', email: 'option5@example.com' },
        { id: '6', title: 'Option 6', email: 'option6@example.com' },
        { id: '7', title: 'Option 7', email: 'option7@example.com' },
        { id: '8', title: 'Option 8', email: 'option8@example.com' },
        { id: '9', title: 'Option 9', email: 'option9@example.com' },
        { id: '10', title: 'Option 10', email: 'option10@example.com' },
      ];

      const filteredOptions = availableOptions.filter(
        (option) => !selectedIds.includes(option.id) && option.title.toLowerCase().includes(term.toLowerCase())
      );

      resolve(filteredOptions);
    }, 1000);
  });
};

const CustomForm = (): ReactElement => {
  const { control, handleSubmit, formState: { errors } } = useForm<{ favorites: Favorite[] }>({
    defaultValues: {
      favorites: [{ name: [], type: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'favorites',
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const [options, setOptions] = useState<{ [key: number]: OptionType[] }>({});
  const [inputValues, setInputValues] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState<{ [key: number]: boolean }>({});
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: OptionType[] }>({});
  const [isTyping, setIsTyping] = useState<{ [key: number]: boolean }>({});

  const debouncedInputValues = useDebouncedInputValues(inputValues, 1000);

  useEffect(() => {
    Object.keys(debouncedInputValues).forEach((key) => {
      const index = parseInt(key, 10);
      if (debouncedInputValues[index] === '' || !isTyping[index]) {
        setOptions((prev) => ({ ...prev, [index]: [] }));
        setLoading((prev) => ({ ...prev, [index]: false }));
        return;
      }

      setLoading((prev) => ({ ...prev, [index]: true }));
      const allSelectedIds = Object.values(selectedOptions).flat().map(option => option.id);
      fetchRandomOptions(debouncedInputValues[index], allSelectedIds).then((newOptions) => {
        setOptions((prev) => ({ ...prev, [index]: newOptions }));
        setLoading((prev) => ({ ...prev, [index]: false }));
        setIsTyping((prev) => ({ ...prev, [index]: false })); // Ngừng gọi API sau khi dữ liệu đã tải
      });
    });
  }, [debouncedInputValues, selectedOptions]);

  return (
    <Box sx={{ width: 500 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <Box key={field.id} sx={{ mb: 2 }}>
            <Controller
              name={`favorites.${index}.name`}
              control={control}
              rules={{ required: 'This field is required' }}
              render={({ field, fieldState }) => (
                <>
                  <Autocomplete
                    multiple
                    options={options[index] || []}
                    getOptionLabel={(option) => option.title}
                    filterSelectedOptions
                    loading={loading[index] || false}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    onChange={(_, newValue) => {
                      field.onChange(newValue);
                      setSelectedOptions((prev) => ({ ...prev, [index]: newValue }));
                      setIsTyping((prev) => ({ ...prev, [index]: false })); // Ngừng gọi API sau khi chọn
                    }}
                    onInputChange={(_, newInputValue) => {
                      setInputValues((prev) => ({ ...prev, [index]: newInputValue }));
                      setIsTyping((prev) => ({ ...prev, [index]: true })); // Chỉ gọi API khi người dùng nhập
                    }}
                    renderOption={(props, option) => (
                      <li {...props} key={option.id}>
                        <Grid container alignItems="center">
                          <Grid item xs={6}>
                            <Typography variant="body1">{option.title}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="textSecondary">{option.email}</Typography>
                          </Grid>
                        </Grid>
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select multiple"
                        error={!!fieldState.error}
                        helperText={fieldState.error ? fieldState.error.message : null}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <>
                              {loading[index] ? <CircularProgress color="inherit" size={20} /> : null}
                              {params.InputProps.endAdornment}
                            </>
                          ),
                        }}
                        sx={{ width: 500 }}
                      />
                    )}
                  />
                </>
              )}
            />
            <Controller
              name={`favorites.${index}.type`}
              control={control}
              rules={{ required: 'This field is required' }}
              render={({ field, fieldState }) => (
                <FormControl fullWidth sx={{ mt: 2 }} error={!!fieldState.error}>
                  <InputLabel id={`select-label-${index}`}>Select Label</InputLabel>
                  <Select
                    labelId={`select-label-${index}`}
                    label="Select Label"
                    {...field}
                  >
                    <MenuItem value="A">A</MenuItem>
                    <MenuItem value="B">B</MenuItem>
                  </Select>
                  {fieldState.error && <FormHelperText>{fieldState.error.message}</FormHelperText>}
                </FormControl>
              )}
            />
            {index > 0 && (
              <IconButton
                aria-label="delete"
                onClick={() => remove(index)}
                sx={{ mt: 2 }}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
        ))}
        {fields.length < 3 && (
          <Button
            type="button"
            onClick={() => append({ name: [], type: '' })}
            sx={{ mt: 2 }}
          >
            Add Field
          </Button>
        )}
        <Button type="submit" sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default CustomForm;
