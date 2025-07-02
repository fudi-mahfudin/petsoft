import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/logo.svg';

export default function Logo() {
  return (
    <Link href="/">
      <Image src={logo} alt="PetSoft logo" />
    </Link>
  );
}
