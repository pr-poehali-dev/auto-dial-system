import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface CallTask {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  contacts: number;
  processed: number;
  success: number;
  failed: number;
  operators: number;
}

interface ActiveCall {
  id: string;
  operator: string;
  contact: string;
  duration: string;
  script: string;
  status: 'connecting' | 'talking' | 'resolving';
}

interface AIMessage {
  id: string;
  message: string;
  timestamp: string;
  type: 'tip' | 'warning' | 'success';
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'operator';
  status: 'active' | 'inactive' | 'busy';
  tasksAssigned: number;
  callsToday: number;
  successRate: number;
  lastActivity: string;
}

interface CallRecord {
  id: string;
  operator: string;
  contact: string;
  duration: string;
  timestamp: string;
  resolution: string;
  recording?: string;
  rating?: number;
  comment?: string;
  evaluatedBy?: string;
}

interface OperatorShift {
  id: string;
  operatorId: string;
  startTime: string;
  endTime?: string;
  breakTime: number; // в минутах
  maxBreakTime: number;
  status: 'working' | 'on-break' | 'finished';
}

interface PresentationSlide {
  id: string;
  title: string;
  type: 'stats' | 'chart' | 'table';
  data: any;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentUser] = useState({ role: 'admin', name: 'Администратор' }); // Mock current user
  const [isVideoConferenceOpen, setIsVideoConferenceOpen] = useState(false);
  const [selectedCallRecording, setSelectedCallRecording] = useState<string | null>(null);
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [operatorShift, setOperatorShift] = useState<OperatorShift | null>(null);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [breakTimeUsed, setBreakTimeUsed] = useState(0);
  const [callRating, setCallRating] = useState(0);
  const [ratingComment, setRatingComment] = useState('');
  
  const callTasks: CallTask[] = [
    {
      id: '1',
      name: 'Автопрозвон клиентской базы',
      status: 'active',
      contacts: 1500,
      processed: 847,
      success: 312,
      failed: 89,
      operators: 8
    },
    {
      id: '2', 
      name: 'Найм на работу',
      status: 'active',
      contacts: 500,
      processed: 234,
      success: 67,
      failed: 23,
      operators: 4
    },
    {
      id: '3',
      name: 'Опрос клиентов',
      status: 'paused',
      contacts: 800,
      processed: 156,
      success: 89,
      failed: 12,
      operators: 3
    }
  ];

  const activeCalls: ActiveCall[] = [
    {
      id: '1',
      operator: 'Анна К.',
      contact: '+7 (999) 123-45-67',
      duration: '02:34',
      script: 'Презентация услуг',
      status: 'talking'
    },
    {
      id: '2', 
      operator: 'Михаил С.',
      contact: '+7 (999) 987-65-43',
      duration: '00:45',
      script: 'Собеседование',
      status: 'connecting'
    },
    {
      id: '3',
      operator: 'Елена В.',
      contact: '+7 (999) 555-77-88',
      duration: '05:12',
      script: 'Опрос',
      status: 'resolving'
    }
  ];

  const aiMessages: AIMessage[] = [
    {
      id: '1',
      message: 'Рекомендую увеличить паузу между звонками для задачи "Найм на работу" - слишком высокий процент сбросов',
      timestamp: '14:32',
      type: 'tip'
    },
    {
      id: '2',
      message: 'Внимание! В задаче "Автопрозвон" превышен лимит недозвонов для оператора Михаила С.',
      timestamp: '14:15',
      type: 'warning'
    },
    {
      id: '3',
      message: 'Отличная работа! Конверсия в задаче "Опрос клиентов" выросла на 15%',
      timestamp: '13:45',
      type: 'success'
    }
  ];

  const users: User[] = [
    {
      id: '1',
      name: 'Анна Кузнецова',
      email: 'anna.k@company.com',
      role: 'operator',
      status: 'busy',
      tasksAssigned: 2,
      callsToday: 45,
      successRate: 68,
      lastActivity: '2 минуты назад'
    },
    {
      id: '2',
      name: 'Михаил Смирнов',
      email: 'mikhail.s@company.com',
      role: 'operator',
      status: 'active',
      tasksAssigned: 1,
      callsToday: 32,
      successRate: 45,
      lastActivity: '1 минута назад'
    },
    {
      id: '3',
      name: 'Елена Волкова',
      email: 'elena.v@company.com',
      role: 'operator',
      status: 'active',
      tasksAssigned: 2,
      callsToday: 51,
      successRate: 73,
      lastActivity: '5 минут назад'
    },
    {
      id: '4',
      name: 'Дмитрий Петров',
      email: 'dmitry.p@company.com',
      role: 'admin',
      status: 'active',
      tasksAssigned: 0,
      callsToday: 0,
      successRate: 0,
      lastActivity: 'сейчас'
    }
  ];

  const callRecords: CallRecord[] = [
    {
      id: '1',
      operator: 'Анна К.',
      contact: '+7 (999) 123-45-67',
      duration: '02:34',
      timestamp: '14:45',
      resolution: 'Успешно',
      recording: '/recordings/call_001.mp3',
      rating: 4,
      comment: 'Хорошая презентация продукта',
      evaluatedBy: 'Администратор'
    },
    {
      id: '2',
      operator: 'Михаил С.',
      contact: '+7 (999) 987-65-43',
      duration: '01:12',
      timestamp: '14:30',
      resolution: 'Отказ',
      recording: '/recordings/call_002.mp3',
      rating: 2,
      comment: 'Нужно улучшить технику возражений',
      evaluatedBy: 'Администратор'
    },
    {
      id: '3',
      operator: 'Елена В.',
      contact: '+7 (999) 555-77-88',
      duration: '03:45',
      timestamp: '14:15',
      resolution: 'Перезвон',
      recording: '/recordings/call_003.mp3',
      rating: 5,
      comment: 'Отличная работа с возражениями',
      evaluatedBy: 'Администратор'
    }
  ];

  const presentationSlides: PresentationSlide[] = [
    {
      id: '1',
      title: 'Общая статистика дня',
      type: 'stats',
      data: {
        totalCalls: users.reduce((acc, u) => acc + u.callsToday, 0),
        successfulCalls: 468,
        averageConversion: 24.8,
        activeOperators: users.filter(u => u.role === 'operator' && u.status === 'active').length
      }
    },
    {
      id: '2', 
      title: 'Производительность операторов',
      type: 'table',
      data: users.filter(u => u.role === 'operator').map(u => ({
        name: u.name,
        calls: u.callsToday,
        success: u.successRate,
        tasks: u.tasksAssigned
      }))
    },
    {
      id: '3',
      title: 'Статистика по задачам',
      type: 'table', 
      data: callTasks.map(t => ({
        name: t.name,
        progress: Math.round((t.processed / t.contacts) * 100),
        success: t.success,
        conversion: Math.round((t.success / t.processed) * 100)
      }))
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'paused': return 'bg-yellow-500';
      case 'completed': return 'bg-blue-500';
      case 'connecting': return 'bg-yellow-500';
      case 'talking': return 'bg-green-500';
      case 'resolving': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Активна';
      case 'paused': return 'Пауза';
      case 'completed': return 'Завершена';
      case 'connecting': return 'Соединение';
      case 'talking': return 'Разговор';
      case 'resolving': return 'Резолюция';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-coral-50 to-mystic-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-coral-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-coral-500 to-mystic-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-coral-600 to-mystic-600 bg-clip-text text-transparent">
                  TRISHA CALL
                </h1>
                <p className="text-sm text-gray-600">Система автопрозвона</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Icon name="Circle" size={8} className="mr-1 fill-current" />
                Система активна
              </Badge>
              
              {/* Operator Controls */}
              {currentUser.role === 'operator' && (
                <div className="flex items-center gap-2">
                  {!operatorShift ? (
                    <Button 
                      onClick={() => setOperatorShift({
                        id: '1',
                        operatorId: '1',
                        startTime: new Date().toLocaleTimeString(),
                        breakTime: 0,
                        maxBreakTime: 60,
                        status: 'working'
                      })}
                      className="bg-green-500 hover:bg-green-600 text-white"
                      size="sm"
                    >
                      <Icon name="Play" size={16} className="mr-2" />
                      Начать смену
                    </Button>
                  ) : (
                    <>
                      {operatorShift.status === 'working' && (
                        <>
                          <Button 
                            onClick={() => {
                              setIsOnBreak(true);
                              setOperatorShift({...operatorShift, status: 'on-break'});
                            }}
                            disabled={breakTimeUsed >= operatorShift.maxBreakTime}
                            variant="outline" 
                            size="sm"
                            className="bg-yellow-50 text-yellow-700 border-yellow-200"
                          >
                            <Icon name="Pause" size={16} className="mr-2" />
                            Перерыв ({breakTimeUsed}/{operatorShift.maxBreakTime}м)
                          </Button>
                          <Button 
                            onClick={() => setOperatorShift({...operatorShift, status: 'finished', endTime: new Date().toLocaleTimeString()})}
                            variant="outline" 
                            size="sm"
                            className="bg-red-50 text-red-700 border-red-200"
                          >
                            <Icon name="Square" size={16} className="mr-2" />
                            Завершить
                          </Button>
                        </>
                      )}
                      {operatorShift.status === 'on-break' && (
                        <Button 
                          onClick={() => {
                            setIsOnBreak(false);
                            setOperatorShift({...operatorShift, status: 'working'});
                          }}
                          className="bg-green-500 hover:bg-green-600 text-white"
                          size="sm"
                        >
                          <Icon name="Play" size={16} className="mr-2" />
                          Вернуться к работе
                        </Button>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Admin Controls */}
              {currentUser.role === 'admin' && (
                <Button 
                  onClick={() => setIsVideoConferenceOpen(true)} 
                  variant="outline" 
                  size="sm"
                  className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                >
                  <Icon name="Video" size={16} className="mr-2" />
                  Видеоконференция
                </Button>
              )}
              
              <Avatar>
                <AvatarFallback className="bg-coral-100 text-coral-700">
                  {currentUser.role === 'admin' ? 'АД' : 'ОП'}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-600">{currentUser.name}</span>
              
              {operatorShift && (
                <Badge variant="outline" className={`${
                  operatorShift.status === 'working' ? 'bg-green-50 text-green-700 border-green-200' :
                  operatorShift.status === 'on-break' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                  'bg-gray-50 text-gray-700 border-gray-200'
                }`}>
                  {operatorShift.status === 'working' ? 'В работе' :
                   operatorShift.status === 'on-break' ? 'На перерыве' :
                   'Смена завершена'}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white/60 backdrop-blur-sm border-b border-coral-100">
        <div className="container mx-auto px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 lg:grid-cols-9 w-full bg-transparent h-14">{/* Добавляем колонку для панели администратора */}
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-coral-100 data-[state=active]:text-coral-700">
                <Icon name="LayoutDashboard" size={16} className="mr-2" />
                Дашборд
              </TabsTrigger>
              <TabsTrigger value="tasks" className="data-[state=active]:bg-coral-100 data-[state=active]:text-coral-700">
                <Icon name="CheckSquare" size={16} className="mr-2" />
                Задачи
              </TabsTrigger>
              <TabsTrigger value="calls" className="data-[state=active]:bg-coral-100 data-[state=active]:text-coral-700">
                <Icon name="Phone" size={16} className="mr-2" />
                Звонки
              </TabsTrigger>
              <TabsTrigger value="contacts" className="data-[state=active]:bg-coral-100 data-[state=active]:text-coral-700">
                <Icon name="Users" size={16} className="mr-2" />
                Контакты
              </TabsTrigger>
              <TabsTrigger value="reports" className="data-[state=active]:bg-coral-100 data-[state=active]:text-coral-700">
                <Icon name="BarChart3" size={16} className="mr-2" />
                Отчеты
              </TabsTrigger>
              <TabsTrigger value="chat" className="data-[state=active]:bg-coral-100 data-[state=active]:text-coral-700">
                <Icon name="MessageSquare" size={16} className="mr-2" />
                Чат
              </TabsTrigger>
              <TabsTrigger value="calendar" className="data-[state=active]:bg-coral-100 data-[state=active]:text-coral-700">
                <Icon name="Calendar" size={16} className="mr-2" />
                Календарь
              </TabsTrigger>
              <TabsTrigger value="ai" className="data-[state=active]:bg-coral-100 data-[state=active]:text-coral-700">
                <Icon name="Bot" size={16} className="mr-2" />
                ИИ
              </TabsTrigger>
              {currentUser.role === 'admin' && (
                <TabsTrigger value="admin" className="data-[state=active]:bg-coral-100 data-[state=active]:text-coral-700">
                  <Icon name="Shield" size={16} className="mr-2" />
                  Админ
                </TabsTrigger>
              )}
            </TabsList>
          </Tabs>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} className="w-full">
          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-coral-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Активных звонков</CardTitle>
                  <Icon name="Phone" className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">12</div>
                  <p className="text-xs text-gray-500">+2 за последний час</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-coral-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Успешных контактов</CardTitle>
                  <Icon name="CheckCircle" className="h-4 w-4 text-coral-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-coral-600">468</div>
                  <p className="text-xs text-gray-500">+23% за сегодня</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-coral-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Активных задач</CardTitle>
                  <Icon name="Target" className="h-4 w-4 text-mystic-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-mystic-600">3</div>
                  <p className="text-xs text-gray-500">15 операторов работают</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-coral-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Конверсия</CardTitle>
                  <Icon name="TrendingUp" className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">24.8%</div>
                  <p className="text-xs text-gray-500">+1.2% к вчера</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Active Calls */}
              <Card className="bg-white/80 backdrop-blur-sm border-coral-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Phone" className="h-5 w-5 text-green-500" />
                    Активные звонки
                  </CardTitle>
                  <CardDescription>Текущие разговоры операторов</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-80">
                    <div className="space-y-4">
                      {activeCalls.map((call) => (
                        <div key={call.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                          <div className="space-y-1">
                            <p className="font-medium">{call.operator}</p>
                            <p className="text-sm text-gray-600">{call.contact}</p>
                            <p className="text-xs text-gray-500">{call.script}</p>
                          </div>
                          <div className="text-right space-y-2">
                            <Badge className={`${getStatusColor(call.status)} text-white`}>
                              {getStatusText(call.status)}
                            </Badge>
                            <p className="text-sm font-mono">{call.duration}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* AI Assistant */}
              <Card className="bg-white/80 backdrop-blur-sm border-coral-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-coral-500 to-mystic-500 rounded-full flex items-center justify-center">
                      <Icon name="Sparkles" className="h-4 w-4 text-white" />
                    </div>
                    ИИ-Помощник Trisha
                  </CardTitle>
                  <CardDescription>Умные рекомендации и аналитика</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-80">
                    <div className="space-y-4">
                      {/* AI Error Notifications for Current User */}
                      {currentUser.role === 'operator' && (
                        <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded-lg">
                          <div className="flex items-start justify-between">
                            <Icon name="AlertTriangle" className="h-4 w-4 mt-0.5 text-red-500" />
                            <span className="text-xs text-gray-500">Только что</span>
                          </div>
                          <p className="text-sm mt-2 font-medium">🚨 Анализ вашего последнего звонка</p>
                          <p className="text-sm mt-1">Обнаружены области для улучшения: слишком быстрая речь, недостаточное время на возражения. Рекомендую замедлить темп и активнее слушать клиента.</p>
                          <Button size="sm" variant="outline" className="mt-2 text-xs">
                            <Icon name="Play" size={12} className="mr-1" />
                            Прослушать фрагмент
                          </Button>
                        </div>
                      )}
                      
                      {aiMessages.map((msg) => (
                        <div key={msg.id} className={`p-3 rounded-lg border-l-4 ${
                          msg.type === 'tip' ? 'bg-blue-50 border-blue-400' :
                          msg.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                          'bg-green-50 border-green-400'
                        }`}>
                          <div className="flex items-start justify-between">
                            <Icon name={
                              msg.type === 'tip' ? 'Lightbulb' :
                              msg.type === 'warning' ? 'AlertTriangle' :
                              'CheckCircle'
                            } className={`h-4 w-4 mt-0.5 ${
                              msg.type === 'tip' ? 'text-blue-500' :
                              msg.type === 'warning' ? 'text-yellow-500' :
                              'text-green-500'
                            }`} />
                            <span className="text-xs text-gray-500">{msg.timestamp}</span>
                          </div>
                          <p className="text-sm mt-2">{msg.message}</p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Задачи автопрозвона</h2>
              <Button className="bg-coral-500 hover:bg-coral-600 text-white">
                <Icon name="Plus" size={16} className="mr-2" />
                Создать задачу
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {callTasks.map((task) => (
                <Card key={task.id} className="bg-white/80 backdrop-blur-sm border-coral-100">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{task.name}</CardTitle>
                      <Badge className={`${getStatusColor(task.status)} text-white`}>
                        {getStatusText(task.status)}
                      </Badge>
                    </div>
                    <CardDescription>
                      {task.operators} операторов работают
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Прогресс</span>
                        <span>{task.processed}/{task.contacts}</span>
                      </div>
                      <Progress 
                        value={(task.processed / task.contacts) * 100} 
                        className="h-2"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="flex items-center gap-2">
                          <Icon name="CheckCircle" className="h-4 w-4 text-green-500" />
                          <span>Успешно</span>
                        </div>
                        <p className="font-semibold text-green-600">{task.success}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <Icon name="XCircle" className="h-4 w-4 text-red-500" />
                          <span>Отказы</span>
                        </div>
                        <p className="font-semibold text-red-600">{task.failed}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {task.status === 'active' ? (
                        <Button variant="outline" size="sm" className="flex-1">
                          <Icon name="Pause" size={14} className="mr-1" />
                          Пауза
                        </Button>
                      ) : (
                        <Button size="sm" className="flex-1 bg-green-500 hover:bg-green-600">
                          <Icon name="Play" size={14} className="mr-1" />
                          Запустить
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Icon name="Settings" size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Other tabs content - placeholder */}
          <TabsContent value="calls">
            <Card className="bg-white/80 backdrop-blur-sm border-coral-100">
              <CardHeader>
                <CardTitle>Управление звонками</CardTitle>
                <CardDescription>История и мониторинг всех звонков</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">Раздел в разработке</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts">
            <Card className="bg-white/80 backdrop-blur-sm border-coral-100">
              <CardHeader>
                <CardTitle>База контактов</CardTitle>
                <CardDescription>Управление контактами и загрузка новых</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">Раздел в разработке</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card className="bg-white/80 backdrop-blur-sm border-coral-100">
              <CardHeader>
                <CardTitle>Отчеты и аналитика</CardTitle>
                <CardDescription>Детальная статистика работы</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">Раздел в разработке</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chat">
            <Card className="bg-white/80 backdrop-blur-sm border-coral-100">
              <CardHeader>
                <CardTitle>Чат с администрацией</CardTitle>
                <CardDescription>Общение между операторами и админами</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">Раздел в разработке</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar">
            <Card className="bg-white/80 backdrop-blur-sm border-coral-100">
              <CardHeader>
                <CardTitle>Календарь и расписание</CardTitle>
                <CardDescription>Планирование звонков и встреч</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">Раздел в разработке</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai">
            <Card className="bg-white/80 backdrop-blur-sm border-coral-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-coral-500 to-mystic-500 rounded-full flex items-center justify-center">
                    <Icon name="Sparkles" className="h-4 w-4 text-white" />
                  </div>
                  ИИ-Помощник Trisha
                </CardTitle>
                <CardDescription>Искусственный интеллект для оптимизации работы</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-coral-50 to-mystic-50 p-6 rounded-lg">
                    <h3 className="font-semibold mb-2">🦊 Привет! Я Trisha, ваш ИИ-помощник</h3>
                    <p className="text-gray-600 mb-4">
                      Я анализирую данные звонков, предлагаю оптимизации и помогаю повысить эффективность работы call-центра.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg">
                        <Icon name="TrendingUp" className="h-6 w-6 text-green-500 mb-2" />
                        <h4 className="font-medium">Анализ эффективности</h4>
                        <p className="text-sm text-gray-600">Отслеживаю конверсию и предлагаю улучшения</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <Icon name="Bot" className="h-6 w-6 text-blue-500 mb-2" />
                        <h4 className="font-medium">Умные рекомендации</h4>
                        <p className="text-sm text-gray-600">Подсказываю оптимальное время для звонков</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Admin Panel */}
          {currentUser.role === 'admin' && (
            <TabsContent value="admin" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Панель администратора</h2>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => setIsVideoConferenceOpen(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <Icon name="Video" size={16} className="mr-2" />
                    Видеоконференция
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* User Management */}
                <Card className="bg-white/80 backdrop-blur-sm border-coral-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Users" className="h-5 w-5 text-coral-500" />
                      Управление пользователями
                    </CardTitle>
                    <CardDescription>Операторы и администраторы системы</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-80">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Имя</TableHead>
                            <TableHead>Роль</TableHead>
                            <TableHead>Статус</TableHead>
                            <TableHead>Действия</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {users.map((user) => (
                            <TableRow key={user.id}>
                              <TableCell>
                                <div>
                                  <p className="font-medium">{user.name}</p>
                                  <p className="text-xs text-gray-500">{user.email}</p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                                  {user.role === 'admin' ? 'Админ' : 'Оператор'}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge className={`${getStatusColor(user.status)} text-white`}>
                                  {user.status === 'active' ? 'Активен' : 
                                   user.status === 'busy' ? 'Занят' : 'Неактивен'}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-1">
                                  <Button variant="outline" size="sm">
                                    <Icon name="Edit" size={14} />
                                  </Button>
                                  {user.role === 'operator' && (
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      className="text-blue-600 hover:text-blue-700"
                                    >
                                      <Icon name="ArrowUp" size={14} />
                                    </Button>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </CardContent>
                </Card>

                {/* Call Monitoring & Recordings */}
                <Card className="bg-white/80 backdrop-blur-sm border-coral-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Headphones" className="h-5 w-5 text-mystic-500" />
                      Прослушка звонков
                    </CardTitle>
                    <CardDescription>Записи разговоров и мониторинг качества</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-80">
                      <div className="space-y-3">
                        {callRecords.map((record) => (
                          <div key={record.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                            <div className="space-y-1">
                              <p className="font-medium">{record.operator}</p>
                              <p className="text-sm text-gray-600">{record.contact}</p>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span>{record.timestamp}</span>
                                <span>{record.duration}</span>
                                <Badge variant="outline" className="text-xs">
                                  {record.resolution}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <div className="flex gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setSelectedCallRecording(record.id)}
                                >
                                  <Icon name="Play" size={14} className="mr-1" />
                                  Слушать
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Icon name="Download" size={14} />
                                </Button>
                              </div>
                              {record.rating && (
                                <div className="text-right">
                                  <div className="flex items-center gap-1 justify-end">
                                    {[1,2,3,4,5].map(star => (
                                      <Icon 
                                        key={star}
                                        name="Star" 
                                        size={12} 
                                        className={star <= record.rating! ? "text-yellow-400 fill-current" : "text-gray-300"} 
                                      />
                                    ))}
                                  </div>
                                  <p className="text-xs text-gray-500 mt-1">{record.comment}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>

              {/* System Statistics for Admins */}
              <Card className="bg-white/80 backdrop-blur-sm border-coral-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="BarChart3" className="h-5 w-5 text-green-500" />
                    Системная аналитика
                  </CardTitle>
                  <CardDescription>Детальная статистика по всем операторам и задачам</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-coral-600 mb-2">
                        {users.filter(u => u.role === 'operator').length}
                      </div>
                      <p className="text-sm text-gray-600">Активных операторов</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-mystic-600 mb-2">
                        {users.reduce((acc, u) => acc + u.callsToday, 0)}
                      </div>
                      <p className="text-sm text-gray-600">Звонков сегодня</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {Math.round(users.filter(u => u.role === 'operator').reduce((acc, u) => acc + u.successRate, 0) / users.filter(u => u.role === 'operator').length)}%
                      </div>
                      <p className="text-sm text-gray-600">Средняя конверсия</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>

        {/* Video Conference Modal */}
        <Dialog open={isVideoConferenceOpen} onOpenChange={setIsVideoConferenceOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Icon name="Video" className="h-5 w-5" />
                Видеоконференция с командой
              </DialogTitle>
              <DialogDescription>
                Совещание с операторами и анализ результатов работы
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              {!isPresentationMode ? (
                <>
                  <div className="bg-gray-900 rounded-lg h-64 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Icon name="Video" className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Видеоконференция активна</p>
                    </div>
                  </div>
                  
                  {/* Meeting Controls */}
                  <div className="flex justify-center gap-4">
                    <Button variant="outline" className="bg-red-50 text-red-600 border-red-200">
                      <Icon name="MicOff" size={16} className="mr-2" />
                      Микрофон
                    </Button>
                    <Button variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                      <Icon name="VideoOff" size={16} className="mr-2" />
                      Камера
                    </Button>
                    <Button variant="outline" className="bg-green-50 text-green-600 border-green-200">
                      <Icon name="Share" size={16} className="mr-2" />
                      Экран
                    </Button>
                    <Button 
                      onClick={() => setIsPresentationMode(true)}
                      className="bg-coral-500 hover:bg-coral-600 text-white"
                    >
                      <Icon name="Presentation" size={16} className="mr-2" />
                      Презентация
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {/* Presentation Mode */}
                  <div className="bg-white rounded-lg border">
                    <div className="bg-gray-800 text-white px-4 py-2 flex items-center justify-between rounded-t-lg">
                      <h3 className="font-medium">Презентация результатов работы</h3>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                          disabled={currentSlide === 0}
                          className="text-white border-white hover:bg-white hover:text-black"
                        >
                          <Icon name="ChevronLeft" size={14} />
                        </Button>
                        <span className="text-sm">{currentSlide + 1} / {presentationSlides.length}</span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setCurrentSlide(Math.min(presentationSlides.length - 1, currentSlide + 1))}
                          disabled={currentSlide === presentationSlides.length - 1}
                          className="text-white border-white hover:bg-white hover:text-black"
                        >
                          <Icon name="ChevronRight" size={14} />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setIsPresentationMode(false)}
                          className="text-white border-white hover:bg-white hover:text-black"
                        >
                          <Icon name="X" size={14} />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-6 h-96">
                      {presentationSlides[currentSlide] && (
                        <div className="h-full">
                          <h2 className="text-2xl font-bold mb-6 text-center">{presentationSlides[currentSlide].title}</h2>
                          
                          {presentationSlides[currentSlide].type === 'stats' && (
                            <div className="grid grid-cols-2 gap-6 h-full">
                              <div className="text-center">
                                <div className="text-4xl font-bold text-coral-600 mb-2">
                                  {presentationSlides[currentSlide].data.totalCalls}
                                </div>
                                <p className="text-lg">Всего звонков</p>
                              </div>
                              <div className="text-center">
                                <div className="text-4xl font-bold text-green-600 mb-2">
                                  {presentationSlides[currentSlide].data.successfulCalls}
                                </div>
                                <p className="text-lg">Успешных контактов</p>
                              </div>
                              <div className="text-center">
                                <div className="text-4xl font-bold text-mystic-600 mb-2">
                                  {presentationSlides[currentSlide].data.averageConversion}%
                                </div>
                                <p className="text-lg">Средняя конверсия</p>
                              </div>
                              <div className="text-center">
                                <div className="text-4xl font-bold text-blue-600 mb-2">
                                  {presentationSlides[currentSlide].data.activeOperators}
                                </div>
                                <p className="text-lg">Активных операторов</p>
                              </div>
                            </div>
                          )}
                          
                          {presentationSlides[currentSlide].type === 'table' && (
                            <div className="overflow-auto h-full">
                              <table className="w-full border-collapse">
                                <thead>
                                  <tr className="border-b">
                                    {Object.keys(presentationSlides[currentSlide].data[0] || {}).map(key => (
                                      <th key={key} className="text-left p-3 font-semibold capitalize">
                                        {key === 'name' ? 'Имя' : 
                                         key === 'calls' ? 'Звонки' :
                                         key === 'success' ? 'Успешно' :
                                         key === 'tasks' ? 'Задачи' :
                                         key === 'progress' ? 'Прогресс' :
                                         key === 'conversion' ? 'Конверсия' : key}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {presentationSlides[currentSlide].data.map((row: any, index: number) => (
                                    <tr key={index} className="border-b">
                                      {Object.values(row).map((value: any, cellIndex: number) => (
                                        <td key={cellIndex} className="p-3">
                                          {typeof value === 'number' && Object.keys(row)[cellIndex].includes('percentage') ? 
                                            `${value}%` : value}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* Meeting Participants */}
              <div className="grid grid-cols-3 gap-4">
                {users.filter(u => u.role === 'operator').map(user => (
                  <div key={user.id} className="bg-gray-100 rounded-lg p-3 text-center">
                    <Avatar className="mx-auto mb-2">
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <p className="text-sm font-medium">{user.name}</p>
                    <Badge className={`${getStatusColor(user.status)} text-white text-xs`}>
                      {user.status === 'active' ? 'В сети' : 'Занят'}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Call Recording Player Modal */}
        <Dialog open={!!selectedCallRecording} onOpenChange={() => setSelectedCallRecording(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Запись звонка</DialogTitle>
              <DialogDescription>
                Прослушивание записи разговора оператора
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-medium">
                      {callRecords.find(r => r.id === selectedCallRecording)?.operator}
                    </p>
                    <p className="text-sm text-gray-600">
                      {callRecords.find(r => r.id === selectedCallRecording)?.contact}
                    </p>
                  </div>
                  <Badge variant="outline">
                    {callRecords.find(r => r.id === selectedCallRecording)?.resolution}
                  </Badge>
                </div>
                <div className="flex items-center gap-4">
                  <Button size="sm">
                    <Icon name="Play" size={14} className="mr-2" />
                    Воспроизвести
                  </Button>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-coral-500 h-2 rounded-full w-1/3"></div>
                  </div>
                  <span className="text-sm text-gray-600">
                    {callRecords.find(r => r.id === selectedCallRecording)?.duration}
                  </span>
                </div>
                
                {/* Call Rating Section for Admins */}
                {currentUser.role === 'admin' && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium mb-3">Оценка звонка</h4>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm text-gray-600 mb-2 block">Рейтинг</Label>
                        <div className="flex items-center gap-1">
                          {[1,2,3,4,5].map(star => (
                            <button
                              key={star}
                              onClick={() => setCallRating(star)}
                              className="p-1"
                            >
                              <Icon 
                                name="Star" 
                                size={20} 
                                className={star <= callRating ? "text-yellow-400 fill-current" : "text-gray-300"} 
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="rating-comment" className="text-sm text-gray-600">Комментарий</Label>
                        <textarea
                          id="rating-comment"
                          value={ratingComment}
                          onChange={(e) => setRatingComment(e.target.value)}
                          placeholder="Оставьте комментарий по качеству звонка..."
                          className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm resize-none"
                          rows={3}
                        />
                      </div>
                      <Button size="sm" className="bg-coral-500 hover:bg-coral-600">
                        <Icon name="Save" size={14} className="mr-2" />
                        Сохранить оценку
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Index;