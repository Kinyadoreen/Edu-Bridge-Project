import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { useRegister } from '../hooks/useAuth.js';
import Input from '../components/ui/Input.jsx';
import Button from '../components/ui/Button.jsx';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
  });
  const { mutate: register, isPending, error } = useRegister()
};