
Public Class ProcWove
    Inherits Proc

    Public Shared Function GetInstance(strTableName As String, strFileName As String, strId As String) As Proc
        m_Instance = New ProcWove(strTableName, strFileName, strId)
        Return m_Instance
    End Function

    Protected Sub New(strTableName As String, strFileName As String, strId As String)
        MyBase.New(strTableName, strFileName, strId)
    End Sub

    Protected Overrides Function ReadDatatableToList(dt As DataTable) As Object
        Dim intColCount As Integer = dt.Columns.Count
        Dim strResult As String = String.Empty
        Dim listWove As New List(Of Wove)()

        For Each aRow As DataRow In dt.Rows
            If String.IsNullOrWhiteSpace(GetString(aRow.Item(0))) Then
                Continue For
            End If
            Dim aWove As New Wove()
            aWove.Name = GetString(aRow.Item(0))
            aWove.Day = GetString(aRow.Item(1))
            aWove.Color = GetString(aRow.Item(2))
            aWove.Content = GetString(aRow.Item(3))
            aWove.href = GetString(aRow.Item(4))
            listWove.Add(aWove)
        Next

        Return listWove
    End Function

    Protected Overrides Function CreateDefaultXml(aList As Object) As XElement
        Dim listWove As List(Of Wove) = CType(aList, List(Of Wove))
        Dim xBlockEle As New XElement("Block")
        xBlockEle.SetAttributeValue("id", m_StrId)
        xBlockEle.SetAttributeValue("caption", m_StrTableName)
        xBlockEle.SetAttributeValue("method", "wove")
        xBlockEle.SetAttributeValue("href", m_StrPhpFileName)

        For Each item As Wove In listWove
            Dim xItem As New XElement("Item")
            xItem.SetAttributeValue("name", item.Name)
            xItem.SetAttributeValue("date", item.Day)
            xItem.SetAttributeValue("type", item.Color)
            xItem.SetAttributeValue("text", item.Content)
            If String.IsNullOrWhiteSpace(item.href) = False Then
                xItem.SetAttributeValue("href", item.href)
            End If
            xBlockEle.Add(xItem)
        Next
        Return xBlockEle
    End Function

    Protected Overrides Function CreatePageXml(aList As Object) As XElement
        Return CreateDefaultXml(aList)
    End Function

End Class
