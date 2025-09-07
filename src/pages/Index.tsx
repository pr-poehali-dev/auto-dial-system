import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
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

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
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
              <Avatar>
                <AvatarFallback className="bg-coral-100 text-coral-700">АД</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white/60 backdrop-blur-sm border-b border-coral-100">
        <div className="container mx-auto px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 lg:grid-cols-8 w-full bg-transparent h-14">
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
        </Tabs>
      </main>
    </div>
  );
};

export default Index;