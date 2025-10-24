import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedView } from "@/components/themed-view";
import Card from "@/components/ui/card";
import HeroBanner from "@/components/ui/hero-banner";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { Stack } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type CalendarEvent = {
  id: string;
  date: string;
  title: string;
  time?: string;
  meta?: string;
  category?: string;
};

type CalendarCell = {
  key: string;
  label?: number;
  dateKey?: string;
  hasEvents?: boolean;
  isToday?: boolean;
  isSelected?: boolean;
};

const hebrewMonths = [
  "ינואר",
  "פברואר",
  "מרץ",
  "אפריל",
  "מאי",
  "יוני",
  "יולי",
  "אוגוסט",
  "ספטמבר",
  "אוקטובר",
  "נובמבר",
  "דצמבר",
];

const weekDayLabels = ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"];

const formatDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatDateLabel = (dateKey: string) => {
  if (!dateKey) {
    return "";
  }
  const date = new Date(dateKey + "T00:00:00");
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

export default function SystemScreen() {
  const todayKey = React.useMemo(() => formatDateKey(new Date()), []);
  const [currentMonthDate, setCurrentMonthDate] = React.useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedDateKey, setSelectedDateKey] = React.useState(todayKey);

  const schedule = [
    {
      id: "1",
      time: "08:30",
      duration: "90 דק׳",
      course: "אלגוריתמים מתקדמים",
      lecturer: 'ד"ר יעל כהן',
      location: "בניין 3 · חדר 204",
      type: "מפגש חי",
    },
    {
      id: "2",
      time: "11:00",
      duration: "75 דק׳",
      course: "יסודות בינה מלאכותית",
      lecturer: "מר אלון לוי",
      location: "למידה היברידית · זום",
      type: "שיעור מקוון",
    },
    {
      id: "3",
      time: "13:15",
      duration: "60 דק׳",
      course: "מעבדה במדעי המחשב",
      lecturer: "גב׳ תמר שלו",
      location: "בניין 6 · מעבדה 2",
      type: "מעבדה",
    },
  ];

  const tasks = [
    {
      id: "t1",
      title: "הגשת תרגיל 2 - אלגוריתמים",
      due: "24/10/25",
      detail: "העלה קובץ PDF עד 23:59 במודל",
    },
    {
      id: "t2",
      title: "צפייה בהקלטת שיעור AI",
      due: "היום",
      detail: "חומר למבחן אמצע סמסטר",
    },
  ];

  const reminders = [
    {
      id: "r1",
      label: "מפגש ייעוץ",
      value: "יום ד׳ · 17:00",
      note: 'פגישה עם המתרגל לד"ר יעל כהן',
    },
    {
      id: "r2",
      label: "מסגרת לימודים",
      value: "3 מפגשים\n שנותרו\n השבוע",
      note: "זכרו לעדכן דיווחי נוכחות",
    },
  ];

  const calendarEvents = React.useMemo<CalendarEvent[]>(
    () => [
      {
        id: "ce1",
        date: "2025-10-20",
        title: "שיעור אלגוריתמים מתקדמים",
        time: "08:30",
        meta: "בניין 3 · חדר 204",
        category: "מפגש חי",
      },
      {
        id: "ce2",
        date: "2025-10-21",
        title: "שיעור יסודות בינה מלאכותית",
        time: "11:00",
        meta: "למידה מרחוק · זום",
        category: "שיעור מקוון",
      },
      {
        id: "ce3",
        date: "2025-10-22",
        title: "מעבדה במדעי המחשב",
        time: "13:15",
        meta: "בניין 6 · מעבדה 2",
        category: "מעבדה",
      },
      {
        id: "ce4",
        date: "2025-10-24",
        title: "הגשת תרגיל 2 - אלגוריתמים",
        time: "23:59",
        meta: "העלה קובץ PDF עד חצות",
        category: "משימה",
      },
      {
        id: "ce5",
        date: "2025-10-27",
        title: "מפגש ייעוץ עם המתרגל",
        time: "17:00",
        meta: "בניין 1 · חדר 302",
        category: "ייעוץ",
      },
      {
        id: "ce6",
        date: "2025-11-02",
        title: "מבחן אלגוריתמים מתקדמים",
        time: "09:00",
        meta: "בניין 4 · אולם 201",
        category: "בחינה",
      },
      {
        id: "ce7",
        date: "2025-11-08",
        title: "מבחן יסודות בינה מלאכותית",
        time: "13:30",
        meta: "למידה מרחוק · זום",
        category: "בחינה",
      },
      {
        id: "ce8",
        date: "2025-11-15",
        title: "מבחן סטטיסטיקה להנדסה",
        time: "16:00",
        meta: "בניין 2 · אולם 105",
        category: "בחינה",
      },
    ],
    []
  );

  const eventsByDate = React.useMemo<Record<string, CalendarEvent[]>>(() => {
    const map: Record<string, CalendarEvent[]> = {};
    calendarEvents.forEach((event) => {
      if (!map[event.date]) {
        map[event.date] = [];
      }
      map[event.date].push(event);
    });
    return map;
  }, [calendarEvents]);

  const nextSlot = schedule[0];
  const currentYear = currentMonthDate.getFullYear();
  const currentMonth = currentMonthDate.getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const monthLabel = `${hebrewMonths[currentMonth]} ${currentYear}`;

  const calendarWeeks = React.useMemo(() => {
    const cells: CalendarCell[] = [];

    for (let i = 0; i < startDayIndex; i += 1) {
      cells.push({ key: `leading-${i}` });
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const dateObj = new Date(currentYear, currentMonth, day);
      const dateKey = formatDateKey(dateObj);
      const hasEvents = Boolean(eventsByDate[dateKey]);
      cells.push({
        key: dateKey,
        label: day,
        dateKey,
        hasEvents,
        isToday: dateKey === todayKey,
        isSelected: dateKey === selectedDateKey,
      });
    }

    while (cells.length % 7 !== 0) {
      const index = cells.length;
      cells.push({ key: `trailing-${index}` });
    }

    const weeks: CalendarCell[][] = [];
    for (let i = 0; i < cells.length; i += 7) {
      weeks.push(cells.slice(i, i + 7));
    }
    return weeks;
  }, [
    currentMonth,
    currentYear,
    daysInMonth,
    eventsByDate,
    selectedDateKey,
    startDayIndex,
    todayKey,
  ]);

  React.useEffect(() => {
    const selected = new Date(selectedDateKey + "T00:00:00");
    if (
      selected.getFullYear() !== currentYear ||
      selected.getMonth() !== currentMonth
    ) {
      setSelectedDateKey(formatDateKey(new Date(currentYear, currentMonth, 1)));
    }
  }, [currentMonth, currentYear, selectedDateKey]);

  const selectedEvents = eventsByDate[selectedDateKey] ?? [];

  const handleMonthShift = (direction: "prev" | "next") => {
    setCurrentMonthDate(
      (prev) =>
        new Date(
          prev.getFullYear(),
          prev.getMonth() + (direction === "next" ? 1 : -1),
          1
        )
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "לוח שנה",
        }}
      />
      <ParallaxScrollView>
        <ThemedView style={styles.container} useGradient>
          <HeroBanner
            title="מערכת השיעורים"
            subtitle="היום שלך מרוכז במקום אחד"
            description="עקבו אחר מפגשי הלימוד, המשימות והאירועים החשובים של השבוע."
            align="right"
          >
            {nextSlot ? (
              <View style={styles.heroMetaRow}>
                <View style={styles.heroMetaBadge}>
                  <IconSymbol name="calendar" size={16} color="#fff" />
                  <Text style={styles.heroMetaText}>
                    השיעור הבא · {nextSlot.time}
                  </Text>
                </View>
                <Text style={styles.heroMetaCourse}>{nextSlot.course}</Text>
              </View>
            ) : null}
          </HeroBanner>

          <Card>
            <View style={styles.calendarHeader}>
              <Pressable
                style={styles.calendarNavButton}
                onPress={() => handleMonthShift("prev")}
                accessibilityRole="button"
                accessibilityLabel="חודש קודם"
              >
                <IconSymbol
                  name="chevron.left"
                  size={16}
                  color={Colors.light.tint}
                />
              </Pressable>
              <Text style={styles.calendarMonthLabel}>{monthLabel}</Text>
              <Pressable
                style={styles.calendarNavButton}
                onPress={() => handleMonthShift("next")}
                accessibilityRole="button"
                accessibilityLabel="חודש הבא"
              >
                <IconSymbol
                  name="chevron.right"
                  size={16}
                  color={Colors.light.tint}
                />
              </Pressable>
            </View>

            <View style={styles.calendarWeekDaysRow}>
              {weekDayLabels.map((label) => (
                <Text key={label} style={styles.calendarWeekDayText}>
                  {label}
                </Text>
              ))}
            </View>

            {calendarWeeks.map((week, index) => (
              <View key={`week-${index}`} style={styles.calendarWeekRow}>
                {week.map((cell) => {
                  if (!cell.label || !cell.dateKey) {
                    return (
                      <View
                        key={cell.key}
                        style={styles.calendarDayPlaceholder}
                      />
                    );
                  }
                  return (
                    <Pressable
                      key={cell.key}
                      style={[
                        styles.calendarDay,
                        cell.isSelected && styles.calendarDaySelected,
                      ]}
                      onPress={() => setSelectedDateKey(cell.dateKey!)}
                      accessibilityRole="button"
                      accessibilityLabel={`יום ${cell.label}`}
                    >
                      <Text
                        style={[
                          styles.calendarDayText,
                          cell.isToday && styles.calendarDayTodayText,
                          cell.isSelected && styles.calendarDaySelectedText,
                        ]}
                      >
                        {cell.label}
                      </Text>
                      {cell.hasEvents ? (
                        <View style={styles.calendarDayDot} />
                      ) : null}
                    </Pressable>
                  );
                })}
              </View>
            ))}
          </Card>

          <Card>
            <Text style={styles.sectionTitle}>אירועים ביום הנבחר</Text>
            <Text style={styles.selectedDateLabel}>
              {formatDateLabel(selectedDateKey)}
            </Text>
            {selectedEvents.length > 0 ? (
              selectedEvents.map((event) => (
                <View key={event.id} style={styles.eventRow}>
                  <View style={styles.eventMeta}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    {event.meta ? (
                      <Text style={styles.eventInfo}>{event.meta}</Text>
                    ) : null}
                  </View>
                  <View style={styles.eventPill}>
                    <Text style={styles.eventPillText}>{event.time}</Text>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.emptyStateText}>
                אין משימות או מפגשים ביום זה.
              </Text>
            )}
          </Card>

          <Card>
            <Text style={styles.sectionTitle}>מערכת להיום</Text>
            <View style={styles.slotList}>
              {schedule.map((slot) => (
                <View key={slot.id} style={styles.slotRow}>
                  <View style={styles.slotInfo}>
                    <View style={styles.slotInfoHeader}>
                      <Text style={styles.slotCourse}>{slot.course}</Text>
                      <View style={styles.slotTypePill}>
                        <Text style={styles.slotTypeText}>{slot.type}</Text>
                      </View>
                    </View>
                    <Text style={styles.slotMeta}>{slot.lecturer}</Text>
                    <Text style={styles.slotMeta}>{slot.location}</Text>
                  </View>
                  <View style={styles.slotTimeColumn}>
                    <Text style={styles.slotTime}>{slot.time}</Text>
                    <Text style={styles.slotDuration}>{slot.duration}</Text>
                  </View>
                </View>
              ))}
            </View>
          </Card>

          <Card>
            <Text style={styles.sectionTitle}>משימות קרובות</Text>
            {tasks.map((task) => (
              <View key={task.id} style={styles.taskRow}>
                <View style={styles.taskBullet}>
                  <IconSymbol
                    name="checkmark.seal"
                    size={16}
                    color={Colors.light.tint}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  <Text style={styles.taskDetail}>{task.detail}</Text>
                </View>
                <Text style={styles.taskDue}>{task.due}</Text>
              </View>
            ))}
          </Card>

          <Card>
            <Text style={styles.sectionTitle}>תזכורות</Text>
            <View style={styles.reminderList}>
              {reminders.map((item) => (
                <View key={item.id} style={styles.reminderItem}>
                  <View style={styles.reminderHeader}>
                    <Text style={styles.reminderLabel}>{item.label}</Text>
                    <View style={styles.reminderValuePill}>
                      <Text style={styles.reminderValue}>{item.value}</Text>
                    </View>
                  </View>
                  <Text style={styles.reminderNote}>{item.note}</Text>
                </View>
              ))}
            </View>
          </Card>
        </ThemedView>
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 18 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "right",
    writingDirection: "rtl",
  },
  heroMetaRow: { marginTop: 14, gap: 8 },
  heroMetaBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255,255,255,0.18)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  heroMetaText: { color: "#fff", fontWeight: "600" },
  heroMetaCourse: {
    color: "rgba(255,255,255,0.85)",
    fontWeight: "700",
    textAlign: "right",
    writingDirection: "rtl",
  },
  calendarHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  calendarNavButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(21,101,216,0.12)",
  },
  calendarMonthLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.light.text,
  },
  calendarWeekDaysRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  calendarWeekDayText: {
    flex: 1,
    textAlign: "center",
    fontWeight: "700",
    color: "#4B5563",
  },
  calendarWeekRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  calendarDayPlaceholder: { flex: 1, padding: 6 },
  calendarDay: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.6)",
    borderWidth: 1,
    borderColor: "rgba(21,101,216,0.08)",
    marginHorizontal: 0,
  },
  calendarDaySelected: {
    backgroundColor: Colors.light.tint,
    borderColor: Colors.light.tint,
  },
  calendarDayText: { fontWeight: "700", color: Colors.light.text },
  calendarDayTodayText: { color: Colors.light.tint },
  calendarDaySelectedText: { color: "#fff" },
  calendarDayDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#fff",
    marginTop: 6,
  },
  selectedDateLabel: {
    fontWeight: "700",
    color: Colors.light.tint,
    marginBottom: 8,
    textAlign: "right",
  },
  eventRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "rgba(21,101,216,0.08)",
  },
  eventMeta: { flex: 1, gap: 4 },
  eventTitle: {
    fontWeight: "700",
    color: Colors.light.text,
    textAlign: "right",
  },
  eventInfo: { color: "#4B5563", fontSize: 12, textAlign: "right" },
  eventPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(21,101,216,0.12)",
  },
  eventPillText: { color: Colors.light.tint, fontWeight: "700" },
  emptyStateText: { color: "#4B5563", textAlign: "center", marginTop: 8 },
  slotList: { gap: 12 },
  slotRow: {
    flexDirection: "row-reverse",
    alignItems: "stretch",
    gap: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "rgba(21,101,216,0.06)",
    borderWidth: 1,
    borderColor: "rgba(21,101,216,0.12)",
  },
  slotInfo: { flex: 1, gap: 6 },
  slotInfoHeader: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 2,
    gap: 12,
    flexWrap: "wrap",
  },
  slotTimeColumn: {
    width: 72,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  slotTime: {
    fontWeight: "800",
    color: Colors.light.tint,
    fontSize: 18,
    textAlign: "center",
  },
  slotDuration: {
    color: "#6B7280",
    fontSize: 12,
    textAlign: "center",
    writingDirection: "rtl",
  },
  slotCourse: {
    fontWeight: "700",
    color: Colors.light.text,
    textAlign: "right",
    writingDirection: "rtl",
    flexShrink: 1,
  },
  slotMeta: {
    color: "#6B7280",
    marginTop: 2,
    textAlign: "right",
    writingDirection: "rtl",
  },
  slotTypePill: {
    backgroundColor: "rgba(21,101,216,0.12)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    alignSelf: "flex-start",
  },
  slotTypeText: { color: Colors.light.tint, fontWeight: "700", fontSize: 12 },
  taskRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "rgba(21,101,216,0.08)",
  },
  taskBullet: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(21,101,216,0.12)",
  },
  taskTitle: {
    fontWeight: "700",
    color: Colors.light.text,
    textAlign: "right",
    writingDirection: "rtl",
  },
  taskDetail: { color: "#4B5563", marginTop: 4, fontSize: 12 },
  taskDue: { color: Colors.light.tint, fontWeight: "700", fontSize: 12 },
  reminderList: { gap: 12 },
  reminderItem: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "rgba(21,101,216,0.06)",
    borderWidth: 1,
    borderColor: "rgba(21,101,216,0.12)",
    gap: 10,
  },
  reminderHeader: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  reminderLabel: {
    fontWeight: "700",
    color: Colors.light.text,
    textAlign: "right",
    writingDirection: "rtl",
  },
  reminderNote: {
    color: "#4B5563",
    marginTop: 2,
    textAlign: "right",
    writingDirection: "rtl",
  },
  reminderValuePill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(21,101,216,0.12)",
    alignSelf: "flex-start",
    marginLeft: 12,
  },
  reminderValue: {
    color: Colors.light.tint,
    fontWeight: "700",
    textAlign: "center",
  },
});
