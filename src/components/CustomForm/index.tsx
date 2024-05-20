import React, { ReactElement, useEffect, useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { Autocomplete, TextField, Select, MenuItem, FormControl, InputLabel, Box, CircularProgress, Button, IconButton, FormHelperText } from '@mui/material';
import { useDebouncedInputValues } from '../../utils/customHook'; // Import custom hook
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
    { title: 'Option 1' },
    { title: 'Option 2' },
    { title: 'Option 3' },
    { title: 'Option 4' },
    { title: 'Option 5' },
    { title: 'Option 6' },
    { title: 'Option 7' },
    { title: 'Option 8' },
    { title: 'Option 9' },
    { title: 'Option 10' },
    { title: 'Option 11' },
    { title: 'Option 12' },
    { title: 'Option 13' },
    { title: 'Option 14' },
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
      const allSelectedOptions = Object.values(selectedOptions).flat();
      fetchRandomOptions(allSelectedOptions).then((newOptions) => {
        setOptions((prev) => ({ ...prev, [index]: newOptions }));
        setLoading((prev) => ({ ...prev, [index]: false }));
        setIsTyping((prev) => ({ ...prev, [index]: false })); // Ngừng gọi API sau khi dữ liệu đã tải
      });
    });
  }, [debouncedInputValues, selectedOptions]);

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <Box className={"flex gap-[10px]"} key={field.id} sx={{ mb: 2 }}>
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
                    isOptionEqualToValue={(option, value) => option.title === value.title} // BUG
                    onChange={(_, newValue) => {
                      field.onChange(newValue.map((v: OptionType) => v.title));
                      setSelectedOptions((prev) => ({ ...prev, [index]: newValue }));
                      setIsTyping((prev) => ({ ...prev, [index]: false })); // Ngừng gọi API sau khi chọn
                    }}
                    onInputChange={(_, newInputValue) => {
                      setInputValues((prev) => ({ ...prev, [index]: newInputValue }));
                      setIsTyping((prev) => ({ ...prev, [index]: true })); // Chỉ gọi API khi người dùng nhập
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
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
                <FormControl className='w-[200px]' error={!!fieldState.error}>
                  <Select
                    labelId={`select-label-${index}`}
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
        <div className='flex gap-[10px]'>
        {fields.length < 3 && (
          <Button
            variant='outlined'
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
        </div>
      </form>
    </Box>
  );
};

export default CustomForm;
