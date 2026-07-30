'use client';

import * as React from 'react';

interface SelectContextValue {
  value: string;
  onValueChange?: (val: string) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectContext = React.createContext<SelectContextValue>({
  value: '',
  open: false,
  setOpen: () => {},
});

export function Select({
  value,
  onValueChange,
  children,
}: {
  value: string;
  onValueChange?: (val: string) => void;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <SelectContext.Provider value={{ value, onValueChange, open, setOpen }}>
      <div className="relative inline-block w-full">{children}</div>
    </SelectContext.Provider>
  );
}

export function SelectTrigger({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { open, setOpen } = React.useContext(SelectContext);
  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className={className}
    >
      {children}
    </button>
  );
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const { value } = React.useContext(SelectContext);
  return <span>{value || placeholder}</span>;
}

export function SelectContent({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { open } = React.useContext(SelectContext);
  if (!open) return null;
  return (
    <div
      className={`absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl shadow-2xl p-2 border border-white/10 ${className}`}
      style={{ background: '#0B1021' }}
    >
      {children}
    </div>
  );
}

export function SelectItem({
  value,
  className,
  children,
}: {
  value: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { onValueChange, setOpen } = React.useContext(SelectContext);
  return (
    <div
      onClick={() => {
        onValueChange?.(value);
        setOpen(false);
      }}
      className={`px-3 py-2 rounded-xl transition-colors cursor-pointer hover:bg-white/10 ${className}`}
    >
      {children}
    </div>
  );
}
