"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Jan",
    total: 1200,
  },
  {
    name: "Fév",
    total: 1900,
  },
  {
    name: "Mar",
    total: 1500,
  },
  {
    name: "Avr",
    total: 2200,
  },
  {
    name: "Mai",
    total: 2800,
  },
  {
    name: "Juin",
    total: 3200,
  },
  {
    name: "Juil",
    total: 2800,
  },
  {
    name: "Août",
    total: 3500,
  },
  {
    name: "Sep",
    total: 3000,
  },
  {
    name: "Oct",
    total: 3300,
  },
  {
    name: "Nov",
    total: 3900,
  },
  {
    name: "Déc",
    total: 4200,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value / 1000}k`}
        />
        <Tooltip formatter={(value) => [`${value} FCFA`, "Ventes"]} labelFormatter={(label) => `${label}`} />
        <Bar dataKey="total" fill="#ec4899" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
