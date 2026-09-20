import { useState } from 'react';
import { BottomSheet, Button, Card, OptionSheet, FormRow, TextField } from '@/shared/components';
import { useDisclosure } from '@/shared/hooks';
import { isValid, validateEmail, validateName, validatePassword } from '@/shared/utils/validation.js';
import { useCreateUser } from '../hooks/useUserMutations.js';

const ROLE_OPTIONS = /** @type {const} */ ([
  { value: 'user', label: 'Member', description: 'Works on assigned tasks' },
  { value: 'manager', label: 'Manager', description: 'Assigns and oversees work' },
]);

/**
 * Add a team member without leaving the list.
 *
 * @param {Object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 */
export default function CreateUserSheet({ open, onClose }) {
  const rolePicker = useDisclosure();
  const [values, setValues] = useState({ name: '', email: '', password: '', role: 'user' });
  const [errors, setErrors] = useState(
    /** @type {{ name: string | null, email: string | null, password: string | null }} */ ({
      name: null,
      email: null,
      password: null,
    }),
  );

  const { createUser, isPending } = useCreateUser({
    onCreated: () => {
      setValues({ name: '', email: '', password: '', role: 'user' });
      onClose();
    },
  });

  /** @param {'name' | 'email' | 'password' | 'role'} field @param {string} value */
  const setField = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: null }));
  };

  const submit = () => {
    const nextErrors = {
      name: validateName(values.name),
      email: validateEmail(values.email),
      password: validatePassword(values.password),
    };
    setErrors(nextErrors);
    if (isValid(nextErrors)) createUser(values);
  };

  return (
    <BottomSheet open={open} onClose={onClose} title="Add a team member">
      <div className="px-screen pt-3">
        <Card padding="none" className="divide-y divide-line">
          <TextField
            name="new-user-name"
            value={values.name}
            onChange={(value) => setField('name', value)}
            label="Full name"
            placeholder="Full name"
            error={errors.name}
          />
          <TextField
            name="new-user-email"
            type="email"
            value={values.email}
            onChange={(value) => setField('email', value)}
            label="Email address"
            placeholder="Email address"
            error={errors.email}
          />
          <TextField
            name="new-user-password"
            type="password"
            value={values.password}
            onChange={(value) => setField('password', value)}
            label="Temporary password"
            placeholder="Temporary password"
            error={errors.password}
          />
          <FormRow
            label="Role"
            value={ROLE_OPTIONS.find((option) => option.value === values.role)?.label}
            onClick={rolePicker.show}
          />
        </Card>

        <Button fullWidth className="mt-4" onClick={submit} loading={isPending}>
          Add member
        </Button>
      </div>

      <OptionSheet
        open={rolePicker.open}
        onClose={rolePicker.hide}
        title="Role"
        options={[...ROLE_OPTIONS]}
        value={values.role}
        onSelect={(value) => setField('role', value)}
      />
    </BottomSheet>
  );
}
