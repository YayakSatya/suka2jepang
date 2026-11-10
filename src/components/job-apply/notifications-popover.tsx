"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bell,
  Calendar,
  FileCheck2,
  ArrowRight,
  Clock,
} from "lucide-react";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  href: string;
  read: boolean;
  type: "interview" | "document" | "system";
}

interface NotificationsPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  onItemClick?: () => void;
}

export function NotificationsPopover({
  isOpen,
  onClose,
  onItemClick,
}: NotificationsPopoverProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "notif-1",
      title: "Jadwal Interview TSK Ditetapkan",
      message:
        "Sesi wawancara TSK resmi PT Hatanaka Shokuhin dijadwalkan pada Rabu, 21 Okt 2026, 10.00 WITA via Zoom.",
      time: "10 menit yang lalu",
      href: "/job-apply/interview-tsk/pm-012",
      read: false,
      type: "interview",
    },
    {
      id: "notif-2",
      title: "Konfirmasi Kehadiran Timedoor",
      message:
        "Wawancara awal Timedoor dijadwalkan Kamis, 22 Okt 14.00 WITA. Silakan konfirmasi kesiapan Anda.",
      time: "2 jam yang lalu",
      href: "/job-apply/my-applications",
      read: false,
      type: "interview",
    },
    {
      id: "notif-3",
      title: "Dokumen Paspor Terverifikasi",
      message:
        "Berkas Paspor RI Anda telah disetujui oleh Sarah Agustina (Timedoor Career Support).",
      time: "1 hari yang lalu",
      href: "/job-apply/naitei/pm-012/documents",
      read: false,
      type: "document",
    },
  ]);

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markSingleAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    onItemClick?.();
    onClose();
  };

  return (
    <>
      {/* Invisible backdrop for closing when clicked outside */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="region"
        aria-label="Pusat Notifikasi Siswa"
        className="absolute right-0 top-12 z-50 w-[360px] sm:w-[400px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#FEECEC] text-[#C12121] flex items-center justify-center shrink-0">
              <Bell className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-[#0A0A0A]">Notifikasi</h3>
              <p className="text-[11px] text-[#64748B]">
                {unreadCount > 0
                  ? `${unreadCount} pemberitahuan belum dibaca`
                  : "Semua pemberitahuan sudah dibaca"}
              </p>
            </div>
          </div>

          {unreadCount > 0 && (
            <button
              type="button"
              onClick={markAllAsRead}
              className="text-[11px] font-bold text-[#C12121] hover:underline cursor-pointer"
            >
              Tandai semua dibaca
            </button>
          )}
        </div>

        {/* List of Notifications */}
        <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-100">
          {notifications.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => markSingleAsRead(item.id)}
              className={`p-4 block hover:bg-slate-50/80 transition-colors ${
                !item.read ? "bg-[#FDF8F8]" : "bg-white"
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    item.type === "interview"
                      ? "bg-blue-100 text-[#155DFC]"
                      : "bg-emerald-100 text-[#107C41]"
                  }`}
                >
                  {item.type === "interview" ? (
                    <Calendar className="w-3.5 h-3.5" />
                  ) : (
                    <FileCheck2 className="w-3.5 h-3.5" />
                  )}
                </span>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-[#0A0A0A] truncate">
                      {item.title}
                    </span>
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-[#C12121] shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-[#475569] leading-snug line-clamp-2">
                    {item.message}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-[#94A3B8]">
                    <Clock className="w-3 h-3" />
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
          <Link
            href="/job-apply/my-applications"
            onClick={onClose}
            className="text-xs font-bold text-[#0A0A0A] hover:text-[#C12121] transition-colors inline-flex items-center gap-1"
          >
            <span>Buka Dashboard Lamaran Saya</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </>
  );
}
