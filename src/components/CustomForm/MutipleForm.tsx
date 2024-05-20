import React, { ReactElement, useEffect, useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { Autocomplete, TextField, Select, MenuItem, FormControl, InputLabel, Box, CircularProgress, Button, IconButton, FormHelperText } from '@mui/material';
import { useDebounce } from '../../utils/customHook'; // Import hàm debounce
import DeleteIcon from '@mui/icons-material/Delete';

interface OptionType {
  title: string;
}

interface Favorite {
  name: string[];
  type: string;
}

const fetchRandomOptions = (selectedOptions: OptionType[]): Promise<OptionType[]> => {
    const availableOptions = [
        { title: 'John Smith' },
        { title: 'Maria Garcia' },
        { title: 'Wei Zhang' },
        { title: 'Amelia Pond' },
        { title: 'Chidi Anagonye' },
        { title: 'Akira Takizawa' },
        { title: 'Carlos Diaz' },
        { title: 'Fatima Al-Fihri' },
        { title: 'Ivan Kuznetsov' },
        { title: 'Chiara Rossi' },
        { title: 'Liam O Brien' },
        { title: 'Sophie Dubois' },
        { title: 'Anika Patel' },
        { title: 'Yuto Nakamura' },
        { title: 'Sarah Müller' },
        { title: 'Kofi Mensah' },
        { title: 'Elif Demir' },
        { title: 'Miguel Herrera' },
        { title: 'Xin Li' },
        { title: 'Leah Cohen' }
      ];

  const filteredOptions = availableOptions.filter(
    (option) => !selectedOptions.some((selected) => selected.title === option.title)
  );

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(filteredOptions);
    }, 1000);
  });
};

const CustomForm = (): ReactElement => {
  const { control, handleSubmit, watch, formState: { errors } } = useForm<{ favorites: Favorite[] }>({
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

  const [options, setOptions] = useState<OptionType[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const debouncedInputValue = useDebounce(inputValue, 1000);

  useEffect(() => {
    if (debouncedInputValue === '') {
      setOptions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchRandomOptions(selectedOptions).then((newOptions) => {
      setOptions(newOptions);
      setLoading(false);
    });
  }, [debouncedInputValue]);

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <Box className= {"flex gap-[10px]"} key={field.id} sx={{ mb: 2 }}>
            <Controller
              name={`favorites.${index}.name`}
              control={control}
              rules={{ required: 'This field is required' }}
              render={({ field, fieldState }) => (
                <>
                  <Autocomplete
                    multiple
                    options={options}
                    getOptionLabel={(option) => option.title}
                    filterSelectedOptions
                    loading={loading}
                    onChange={(_, newValue) => {
                      field.onChange(newValue.map((v: OptionType) => v.title));
                      setSelectedOptions(newValue);
                    }}
                    onInputChange={(_, newInputValue) => {
                      setInputValue(newInputValue);
                    }}
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
                              {loading ? <CircularProgress color="inherit" size={20} /> : null}
                              {params.InputProps.endAdornment}
                            </>
                          ),
                        }}
                        sx={{ width: 500}}
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
                <FormControl fullWidth error={!!fieldState.error}>
                  <InputLabel id={`select-label-${index}`}>Select Label</InputLabel>
                  <Select
                    className='w-[200px]'
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
        {fields.length < 2 && (
          <Button
            type="button"
            onClick={() => append({ name: [], type: '' })}
            sx={{ mt: 2 }}
          >
            Add Field
          </Button>
        )}
        <Button variant='outlined' type="submit" sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default CustomForm;
