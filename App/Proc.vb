Imports System.Configuration

Public MustInherit Class Proc

    Public Shared m_Instance As Proc

    Public Shared Function Create(type As String) As Proc
        Select Case type
            Case "學潛水"
                Return ProcWove.GetInstance(type, "BZ01", "course")
            Case "玩潛水"
                Return ProcWove.GetInstance(type, "DZ01", "trip")
            Case "活動照片"
                Return ProcActivePic.GetInstance(type, "B240", "album")
            Case "幹部群"
                Return ProcEmployee.GetInstance(type, "B230", "coach")
            Case "廣告"
                Return ProcAD.GetInstance(type, "", "AD")
            Case "臉書"
                Return ProcFacebook.GetInstance(type, "", "facebook")
            Case Else
                Throw New ArgumentException("type Unknow")
        End Select
    End Function

    Protected Property m_StrTableName As String
    Protected Property m_XmlFileName As String
    Protected Property m_StrFilePath As String
    Protected Property m_StrPhpFileName As String
    Protected Property m_StrId As String
    Protected Property m_StrDefaultFileName As String
    Protected Property m_StrDefaultFilePath As String

    Public Sub New(strTableName As String, strFileName As String, strId As String)
        m_StrTableName = strTableName
        m_StrId = strId
        m_XmlFileName = String.Format("{0}.CH.xml", strFileName)
        m_StrPhpFileName = String.Format("Page/{0}.php", strFileName)

        m_StrDefaultFileName = "Default.CH.xml"
        m_StrDefaultFilePath = String.Format("{0}{1}", ConfigurationManager.AppSettings("FilePath"), m_StrDefaultFileName)
        If Not String.IsNullOrWhiteSpace(strFileName) Then
            m_StrFilePath = String.Format("{0}{1}", ConfigurationManager.AppSettings("FilePath"), m_XmlFileName)
        End If
    End Sub

    Public Overridable Sub Start(dt As DataTable)
        FormExcelReader.ShowMessage("開始處理分頁" + m_StrTableName)
        Dim xeDefault As XElement = CreateDefaultXml(ReadDatatableToList(dt))
        WriteXmlFile(RemovePreviouslyEle(m_StrDefaultFilePath), xeDefault, m_StrDefaultFilePath)

        Dim xePage As XElement = CreatePageXml(ReadDatatableToList(dt))
        WriteXmlFile(RemovePreviouslyEle(m_StrFilePath), xePage, m_StrFilePath)

        FormExcelReader.ShowMessage("處理分頁結束" + m_StrTableName)
    End Sub

    Protected MustOverride Function ReadDatatableToList(dt As DataTable) As Object

    Protected MustOverride Function CreateDefaultXml(aList As Object) As XElement
    Protected MustOverride Function CreatePageXml(aList As Object) As XElement

    Protected Overridable Function RemovePreviouslyEle(strFilePath As String) As XElement
        If String.IsNullOrWhiteSpace(strFilePath) Then
            Return Nothing
        End If
        Dim xECurrentFile As XElement = XElement.Load(strFilePath)

        Dim xeTrips = From o In xECurrentFile.Elements
                      Where o.Attribute("id").Value = m_StrId
                      Select o

        For Each xeTrip As XElement In xeTrips
            xeTrip.RemoveNodes()
        Next

        Return xECurrentFile
    End Function

    Protected Overridable Function WriteXmlFile(xECurrentFile As XElement, aXE As XElement, strFilePath As String) As String
        If String.IsNullOrWhiteSpace(strFilePath) Then
            Return String.Empty
        End If

        Dim xe As XElement = (From o In xECurrentFile.Elements
                              Where o.Attribute("id").Value = m_StrId
                              Select o).FirstOrDefault
        If xe Is Nothing Then
            Throw New ApplicationException(String.Format("Can't find id = [{0}]", m_StrId))
        End If

        For Each item As XElement In aXE.Elements
            xe.Add(item)
        Next
        xECurrentFile.Save(strFilePath)
        FormExcelReader.ShowMessage("轉檔成功" + strFilePath)
        Return xECurrentFile.ToString()
    End Function

    Public Function GetString(objData As Object) As String
        If objData Is DBNull.Value Then
            Return String.Empty
        End If

        If objData Is Nothing Then
            Return String.Empty
        End If

        Return CStr(objData)
    End Function

End Class
