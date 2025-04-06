import React from 'react';

interface Props {
  value: boolean;
  onChange: (val: boolean) => void;
}

export default function OpenNowFilter({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-2 mt-3">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label className="font-semibold">Open Now</label>
    </div>
  );
}
