
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
            aWove.Href = GetString(aRow.Item(4))
            aWove.ShowDefault = GetBoolean(aRow.Item(5))

            If dt.Columns.Count > 6 Then
                aWove.NameDetail = GetString(aRow.Item(6))
                aWove.DayDetail = GetString(aRow.Item(7))
                aWove.ContentDetail = GetString(aRow.Item(8))
            End If

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
            If item.ShowDefault = False Then
                Continue For
            End If
            Dim xItem As New XElement("Item")
            xItem.SetAttributeValue("name", item.Name)
            xItem.SetAttributeValue("date", item.Day)
            xItem.SetAttributeValue("type", item.Color)
            xItem.SetAttributeValue("text", item.Content)
            If String.IsNullOrWhiteSpace(item.Href) = False Then
                xItem.SetAttributeValue("href", item.Href)
            End If
            xBlockEle.Add(xItem)
        Next
        Return xBlockEle
    End Function

    Protected Overrides Function CreatePageXml(aList As Object) As XElement
        Dim listWove As List(Of Wove) = CType(aList, List(Of Wove))
        Dim xBlockEle As New XElement("Block")
        xBlockEle.SetAttributeValue("id", m_StrId)
        xBlockEle.SetAttributeValue("method", "wove")

        For Each item As Wove In listWove
            Dim xItem As New XElement("Item")

            If String.IsNullOrWhiteSpace(item.NameDetail) Then
                xItem.SetAttributeValue("name", item.Name)
            Else
                xItem.SetAttributeValue("name", item.NameDetail)
            End If

            If String.IsNullOrWhiteSpace(item.DayDetail) Then
                xItem.SetAttributeValue("date", item.Day)
            Else
                xItem.SetAttributeValue("date", item.DayDetail)
            End If

            If String.IsNullOrWhiteSpace(item.ContentDetail) Then
                xItem.SetAttributeValue("text", item.Content)
            Else
                xItem.SetAttributeValue("text", item.ContentDetail)
            End If

            xItem.SetAttributeValue("type", item.Color)

            If String.IsNullOrWhiteSpace(item.Href) = False Then
                xItem.SetAttributeValue("href", item.Href)
            End If
            xBlockEle.Add(xItem)
        Next
        Return xBlockEle
    End Function

End Class
